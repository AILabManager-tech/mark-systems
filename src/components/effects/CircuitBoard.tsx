"use client";

import { useEffect, useRef } from "react";

export function CircuitBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mouseX = -500;
    let mouseY = -500;
    let raf = 0;
    let traces: { x1: number; y1: number; x2: number; y2: number; w: number }[] = [];
    let nodes: { x: number; y: number }[] = [];
    let pulses: { x: number; y: number; vx: number; vy: number; life: number }[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = parent!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      canvas!.style.width = rect.width + "px";
      canvas!.style.height = rect.height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid(rect.width, rect.height);
    }

    function buildGrid(w: number, h: number) {
      traces = [];
      nodes = [];
      const step = 70;

      // Create grid nodes
      for (let x = 0; x < w + step; x += step) {
        for (let y = 0; y < h + step; y += step) {
          const nx = x + (Math.random() - 0.5) * 15;
          const ny = y + (Math.random() - 0.5) * 15;
          nodes.push({ x: nx, y: ny });
        }
      }

      // Connect some nodes with traces
      const cols = Math.ceil(w / step) + 1;
      const rows = Math.ceil(h / step) + 1;
      for (let i = 0; i < nodes.length; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const n = nodes[i]!;

        // Horizontal
        if (col < cols - 1 && Math.random() > 0.35) {
          const right = nodes[i + 1];
          if (right) traces.push({ x1: n.x, y1: n.y, x2: right.x, y2: right.y, w: Math.random() > 0.7 ? 1.5 : 0.8 });
        }
        // Vertical
        if (row < rows - 1 && Math.random() > 0.5) {
          const below = nodes[i + cols];
          if (below) traces.push({ x1: n.x, y1: n.y, x2: below.x, y2: below.y, w: Math.random() > 0.7 ? 1.5 : 0.8 });
        }
      }

      // Init pulses
      pulses = [];
      for (let i = 0; i < 30; i++) {
        spawnPulse();
      }
    }

    function spawnPulse() {
      const t = traces[Math.floor(Math.random() * traces.length)];
      if (!t) return;
      const startAtBegin = Math.random() > 0.5;
      const dx = t.x2 - t.x1;
      const dy = t.y2 - t.y1;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len < 1) return;
      const speed = 0.8 + Math.random() * 1.5;
      pulses.push({
        x: startAtBegin ? t.x1 : t.x2,
        y: startAtBegin ? t.y1 : t.y2,
        vx: (startAtBegin ? dx : -dx) / len * speed,
        vy: (startAtBegin ? dy : -dy) / len * speed,
        life: len / speed,
      });
    }

    function draw() {
      const w = parent!.getBoundingClientRect().width;
      const h = parent!.getBoundingClientRect().height;
      ctx!.clearRect(0, 0, w, h);

      // Draw traces
      for (const t of traces) {
        // Distance to mouse
        const mx = (t.x1 + t.x2) / 2;
        const my = (t.y1 + t.y2) / 2;
        const dist = Math.sqrt((mx - mouseX) ** 2 + (my - mouseY) ** 2);
        const prox = Math.max(0, 1 - dist / 280);
        const alpha = 0.04 + prox * 0.18;

        ctx!.beginPath();
        ctx!.moveTo(t.x1, t.y1);
        ctx!.lineTo(t.x2, t.y2);
        ctx!.strokeStyle = `rgba(0, 255, 213, ${alpha})`;
        ctx!.lineWidth = t.w;
        ctx!.stroke();
      }

      // Draw nodes near mouse
      for (const n of nodes) {
        const dist = Math.sqrt((n.x - mouseX) ** 2 + (n.y - mouseY) ** 2);
        if (dist < 220) {
          const alpha = (1 - dist / 220) * 0.5;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, 2, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(0, 255, 213, ${alpha})`;
          ctx!.fill();
        }
      }

      // Draw and update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]!;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        // Mouse proximity boost
        const dist = Math.sqrt((p.x - mouseX) ** 2 + (p.y - mouseY) ** 2);
        if (dist < 200) {
          p.vx *= 1.02;
          p.vy *= 1.02;
        }

        // Draw pulse glow
        ctx!.save();
        ctx!.shadowColor = "rgba(0, 255, 213, 0.9)";
        ctx!.shadowBlur = 15;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0, 255, 213, 0.8)`;
        ctx!.fill();
        ctx!.restore();

        // Trail
        ctx!.beginPath();
        ctx!.moveTo(p.x, p.y);
        ctx!.lineTo(p.x - p.vx * 8, p.y - p.vy * 8);
        ctx!.strokeStyle = "rgba(0, 255, 213, 0.3)";
        ctx!.lineWidth = 2;
        ctx!.stroke();

        if (p.life <= 0) {
          pulses.splice(i, 1);
          spawnPulse();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function onMouse(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
    />
  );
}
