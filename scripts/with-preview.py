#!/usr/bin/env python3
"""Run finite checks against a loopback static export; always close the preview.

python3 scripts/with-preview.py --root /path/to/stage --log /tmp/preview.jsonl \
    --timeout 300 -- node /path/to/check.cjs '{preview_url}'

The timeout must be shorter than the executor timeout. No detached server is
created. PREVIEW_URL is also available to the child command.
"""
import argparse
import json
import os
from pathlib import Path
import signal
import subprocess
import threading
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', required=True, type=Path)
    parser.add_argument('--log', required=True, type=Path)
    parser.add_argument('--timeout', type=float, default=300)
    parser.add_argument('command', nargs=argparse.REMAINDER)
    args = parser.parse_args()
    command = args.command[1:] if args.command[:1] == ['--'] else args.command
    if not args.root.is_dir() or not command or args.timeout <= 0:
        parser.error('existing root, positive timeout and test command required')
    root = args.root.resolve()
    args.log.parent.mkdir(parents=True, exist_ok=True)
    interrupted = threading.Event()
    received_signal = [None]
    child = None
    result = 1
    reason = 'runner_error'
    with args.log.open('a', buffering=1) as log:
        def record(event, **fields):
            log.write(json.dumps(dict(event=event, time=time.time(), **fields)) + '\n')

        class Handler(SimpleHTTPRequestHandler):
            def __init__(self, *a, **kw):
                super().__init__(*a, directory=str(root), **kw)

            def setup(self):
                super().setup()
                self.connection.settimeout(5)

            def handle(self):
                try:
                    super().handle()
                except (BrokenPipeError, ConnectionResetError):
                    # Browser navigation can cancel an in-flight asset fetch.
                    # Keep evidence without misreporting a server termination.
                    record('client_disconnected')

            def translate_path(self, path):
                # Preserve static-export clean URLs for GET and HEAD alike.
                candidate = Path(super().translate_path(path))
                if not urlsplit(path).path.endswith('/') and not candidate.is_file():
                    html = Path(str(candidate) + '.html')
                    if html.is_file():
                        return str(html)
                return str(candidate)

            def log_message(self, *a):
                pass

        server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
        worker = threading.Thread(target=server.serve_forever,
                                  kwargs={'poll_interval': 0.05}, daemon=True)
        url = 'http://127.0.0.1:' + str(server.server_port)

        def on_signal(number, frame):
            received_signal[0] = number
            interrupted.set()

        previous = {sig: signal.signal(sig, on_signal)
                    for sig in (signal.SIGINT, signal.SIGTERM)}
        worker.start()
        record('preview_started', url=url, pid=os.getpid())
        try:
            child = subprocess.Popen(
                [part.replace('{preview_url}', url) for part in command],
                env={**os.environ, 'PREVIEW_URL': url}, start_new_session=True)
            record('checks_started', pid=child.pid)
            deadline = time.monotonic() + args.timeout
            while child.poll() is None and not interrupted.is_set():
                if time.monotonic() >= deadline:
                    break
                interrupted.wait(0.05)
            if interrupted.is_set():
                result, reason = 128 + received_signal[0], 'external_signal'
            elif child.poll() is None:
                result, reason = 124, 'checks_timeout'
            else:
                code = child.returncode
                result = code if code >= 0 else 128 - code
                reason = 'checks_passed' if result == 0 else 'checks_failed'
        except Exception as exc:
            record('runner_error', error=type(exc).__name__)
        finally:
            # Signal only the process group this invocation created. This also
            # cleans up browsers left behind by a failed/timed-out test command.
            if child is not None:
                try:
                    os.killpg(child.pid, signal.SIGTERM)
                    record('checks_group_cleanup', pid=child.pid)
                except ProcessLookupError:
                    pass
                try:
                    child.wait(timeout=3)
                except subprocess.TimeoutExpired:
                    os.killpg(child.pid, signal.SIGKILL)
                    child.wait()
                try:
                    os.killpg(child.pid, signal.SIGKILL)
                except ProcessLookupError:
                    pass
            server.shutdown()
            worker.join(timeout=2)
            server.server_close()
            record('preview_closed', reason=reason, exit_code=result,
                   external_signal=received_signal[0], thread_stopped=not worker.is_alive())
            for sig, handler in previous.items():
                signal.signal(sig, handler)
        print(json.dumps({'preview': 'closed', 'reason': reason, 'exit_code': result}))
    return result


if __name__ == '__main__':
    raise SystemExit(main())
