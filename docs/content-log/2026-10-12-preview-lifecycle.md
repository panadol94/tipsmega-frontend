# Preview lifecycle repair — 2026-10-12

User requested repair of recurring preview SIGTERM notices. The previous staged
server used unbounded `serve_forever()` without an owned cleanup path. This is an
observed lifecycle weakness, not proof of the historical signal sender.

Added `scripts/with-preview.py`: a finite test runner with an in-process loopback
HTTP server, dynamic port, clean static-export routes and captured lifecycle
events. It closes preview resources and reaps its test child on completion,
failure, timeout or handled interruption. Only its own test process group is
cleaned up; production services are untouched. Browser disconnects are recorded
separately. Unknown signals and failed tests remain nonzero outcomes.

Daily Hub automation was updated through the scheduler to use this runner,
substitute `{preview_url}` and collect its exit before the final report.

Verification:
- Success, exit-7 test failure, timeout, external SIGTERM and client connection
  reset fault-injection cases passed; listening sockets were closed afterward.
- Existing staging suite passed at 375/390/1440px: 10 guides, 42 internal links,
  12 Solver combinations, preserved controls, zero page errors or paid scans.
- Lifecycle log records checks_passed, exit_code 0, thread_stopped true and no
  external signal. Backup evidence: daily-hub-20261012-update-identity/
  lifecycle-fixed.jsonl. Final disconnect handling separately fault-tested.
- No production website files deployed or changed. Next scheduled execution
  remains necessary to verify end-to-end scheduler adoption.

Usage: `python3 scripts/with-preview.py --root STAGE --log LOG --timeout 300 -- node CHECK_SCRIPT '{preview_url}'`.
Set the executor timeout above the runner deadline plus cleanup margin. Test
scripts should still close browser clients in their own finally blocks.
