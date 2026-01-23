"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Shell from "./ui/Shell";
import BottomNav from "./ui/BottomNav";

type Line = { text: string; tone?: "green" | "red" | "gold" | "dim" };

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function maskMegaId(id: string) {
  if (id.length < 6) return id;
  return id.slice(0, 2) + "******" + id.slice(-2);
}

function validMegaId(id: string) {
  return /^[012]\d{11}$/.test(id);
}

function randInt(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://tipsmega-api-181873242884.asia-southeast1.run.app";

export default function HomeScan() {
  const [megaId, setMegaId] = useState("");
  const [deviceId, setDeviceId] = useState<string>("");
  const [stars, setStars] = useState<number>(0);

  const [running, setRunning] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [cursorOn, setCursorOn] = useState(true);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // game list: fallback jika file list belum disambung
  const [games, setGames] = useState<string[]>([]);


  // Cursor blink |
  useEffect(() => {
    const t = setInterval(() => setCursorOn((v) => !v), 520);
    return () => clearInterval(t);
  }, []);

  // autoscroll terminal
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, running]);

  // init device + stars
  useEffect(() => {
    const key = "tipsmega_device_id";
    let id = localStorage.getItem(key);
    if (!id) {
      id =
        "dev_" +
        Math.random().toString(16).slice(2) +
        "_" +
        Date.now().toString(16);
      localStorage.setItem(key, id);
    }
    setDeviceId(id);

    fetch(`${API_BASE}/api/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceId: id }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (typeof d?.stars === "number") setStars(d.stars);
      })
      .catch(() => { });
  }, []);

  function pushLine(text: string, tone: Line["tone"] = "dim") {
    setLines((prev) => [...prev, { text, tone }]);
  }

  async function runScan() {
    if (running) return;
    if (!validMegaId(megaId)) return;

    setRunning(true);
    setLines([]);

    // suspense header
    pushLine(">> initializing secure tunnel...", "dim");
    await sleep(900);
    pushLine(">> loading quantum scanner module v3.2", "dim");
    await sleep(900);
    pushLine(`>> target id locked: ${maskMegaId(megaId)}`, "gold");
    await sleep(1200);

    // API scan (tolak stars + overallRtp)
    let apiOverall = randInt(10, 93);
    let apiStars = stars;

    try {
      const r = await fetch(`${API_BASE}/api/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId, megaId }),
      });
      const d = await r.json();
      if (typeof d?.overallRtp === "number") apiOverall = d.overallRtp;
      if (typeof d?.stars === "number") apiStars = d.stars;
    } catch { }

    // fake decrypt progress (lebih suspense)
    pushLine(">> decrypting game tables...", "dim");
    for (let i = 0; i <= 100; i += randInt(6, 13)) {
      await sleep(randInt(260, 520));
      pushLine(`   [${String(i).padStart(3, " ")}%] ...`, "dim");
    }
    pushLine(">> syncing hot signals...", "dim");
    await sleep(900);

    // list output slow
    const list = shuffle(games);
    pushLine(">> START RTP STREAM", "gold");
    await sleep(800);

    for (let i = 0; i < list.length; i++) {
      const rtp = randInt(10, 93);
      const hot = rtp >= 80;
      const warm = rtp >= 55 && rtp < 80;

      const tone: Line["tone"] = hot ? "red" : warm ? "gold" : "green";
      const tag = hot ? "HOT" : warm ? "WARM" : "COOL";

      pushLine(
        `${String(i + 1).padStart(3, "0")} | ${list[i].padEnd(18, " ")} | ${String(
          rtp
        ).padStart(2, "0")}% | ${tag}`,
        tone
      );

      // slow suspense output
      await sleep(randInt(520, 980));
    }

    await sleep(700);
    pushLine(">> STREAM COMPLETE", "gold");
    await sleep(500);
    pushLine(`>> overall signal: ${apiOverall}%`, apiOverall >= 80 ? "red" : apiOverall >= 55 ? "gold" : "green");
    pushLine(`>> stars remaining: ${apiStars}`, "gold");

    setStars(apiStars);
    setRunning(false);
  }

  const isValid = validMegaId(megaId);

  return (
    <Shell>
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold tracking-tight">
          RTP Scanner <span className="text-amber-200">Terminal</span>
        </h1>
        <div className="text-sm text-white/60">
          Masukkan ID Mega888 (12 digit, bermula 0/1/2). Output perlahan mode suspense.
        </div>
      </header>

      {/* Input Card */}
      <section className="card p-4 glow">
        <div className="flex items-center justify-between">
          <div className="text-sm text-white/70">Mega888 ID</div>
          <div className="badge gold-glow">
            <span>⭐</span>
            <span className="font-semibold">{stars}</span>
          </div>
        </div>

        <input
          value={megaId}
          onChange={(e) => setMegaId(e.target.value.replace(/\D/g, "").slice(0, 12))}
          inputMode="numeric"
          placeholder="contoh: 012345678901"
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white outline-none focus:border-amber-300/60"
        />

        <div className="mt-2 text-xs">
          {megaId.length === 0 ? (
            <span className="text-white/40">Tip: guna number sahaja</span>
          ) : isValid ? (
            <span className="text-emerald-300">✅ ID valid, boleh scan</span>
          ) : (
            <span className="text-rose-300">❌ ID mesti 12 digit dan bermula 0/1/2</span>
          )}
        </div>

        <button
          className={`mt-4 w-full ${isValid && !running ? "btn-primary" : "btn-ghost opacity-60"
            }`}
          disabled={!isValid || running || stars <= 0}
          onClick={runScan}
        >
          {running ? "SCANNING..." : stars > 0 ? "SCAN SEKARANG" : "NO STARS"}
        </button>

        <div className="mt-3 text-xs text-white/45">
          Device: <span className="text-white/70">{deviceId.slice(0, 18)}...</span>
        </div>
      </section>

      {/* Terminal */}
      <section className="card p-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Terminal Output</div>
          <div className="text-xs text-white/50">
            {running ? "live stream" : "idle"}
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-white/10 bg-black/70 p-3 h-[320px] overflow-auto font-mono text-[12px] leading-5">
          {lines.length === 0 ? (
            <div className="text-white/40">
              {running ? "booting..." : "Tekan SCAN untuk mula output terminal."}
              <span className={`${cursorOn ? "opacity-100" : "opacity-0"} ml-1`}>|</span>
            </div>
          ) : (
            <>
              {lines.map((l, idx) => (
                <div
                  key={idx}
                  className={
                    l.tone === "red"
                      ? "text-rose-300"
                      : l.tone === "gold"
                        ? "text-amber-200"
                        : l.tone === "green"
                          ? "text-emerald-300"
                          : "text-white/70"
                  }
                >
                  {l.text}
                </div>
              ))}
              <div className={`${cursorOn ? "opacity-100" : "opacity-0"} text-white/70`}>|</div>
              <div ref={bottomRef} />
            </>
          )}
        </div>

        <div className="mt-3 text-xs text-white/45">
          Mode suspense aktif: output perlahan + decrypting delay.
        </div>
      </section>

      <BottomNav />
    </Shell>
  );
}
