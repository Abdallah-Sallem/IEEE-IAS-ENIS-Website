import { useEffect, useId, useRef, useState } from 'react';
import styles from './HeaderSchematic.module.css';

/**
 * HeaderSchematic — the animated "live schematic" behind every page header.
 *
 * Blueprint grid + scan line, circuit traces with travelling light pulses,
 * and two meshing gears. Pure SVG + CSS (transform/opacity only).
 * Pauses when off-screen or when the tab is hidden; static under
 * prefers-reduced-motion; elements flagged `d` are dropped on mobile.
 *
 * Colours: palette only — grid in soft white (5–8%), traces/gears in IAS
 * green #0C7444 (20–25%), pulses + live junction in #00E676 (≤25%),
 * scan line in #1E9668 (12%).
 */

const PULSE = 48; // pulse length in user units

const gear = (cx, cy, r, teeth, dur, dir, d = false) => ({ cx, cy, r, teeth, dur, dir, d });

const SCENES = {
  full: {
    w: 1200,
    h: 700,
    traces: [
      { p: 'M560 170H1200' },
      { p: 'M480 470H1200' },
      { p: 'M640 170V300H780' },
      { p: 'M780 0V700', d: true },
      { p: 'M940 700V330H1200', d: true },
      { p: 'M0 610H1200', d: true },
    ],
    pads: [[700, 170], [980, 170], [780, 470], [940, 470], [1100, 330], [640, 300]],
    live: [780, 170],
    pulses: [
      { axis: 'x', at: 170, from: 560, to: 1200, dur: 7, delay: 0 },
      { axis: 'x', at: 470, from: 1200, to: 480, dur: 9, delay: -3 },
      { axis: 'y', at: 780, from: 0, to: 700, dur: 8, delay: -5, d: true },
      { axis: 'y', at: 940, from: 700, to: 330, dur: 6, delay: -2, d: true },
    ],
    gears: [gear(1060, 560, 100, 20, 80, 1), gear(910, 475, 52, 10, 40, -1, true)],
  },
  compact: {
    w: 1200,
    h: 400,
    traces: [
      { p: 'M560 110H1200' },
      { p: 'M480 300H1200' },
      { p: 'M820 0V400', d: true },
      { p: 'M980 400V210H1200', d: true },
    ],
    pads: [[700, 110], [1000, 110], [820, 300], [980, 300], [1120, 210]],
    live: [820, 110],
    pulses: [
      { axis: 'x', at: 110, from: 560, to: 1200, dur: 7, delay: 0 },
      { axis: 'x', at: 300, from: 1200, to: 480, dur: 9, delay: -4 },
      { axis: 'y', at: 820, from: 0, to: 400, dur: 6, delay: -2, d: true },
    ],
    gears: [gear(1090, 330, 80, 16, 70, 1), gear(970, 258, 42, 8, 35, -1, true)],
  },
};

function Gear({ cx, cy, r, teeth, dur, dir, d }) {
  const toothW = ((2 * Math.PI * r) / teeth) * 0.45;
  return (
    <g transform={`translate(${cx} ${cy})`} className={d ? styles.desktopOnly : undefined}>
      <g
        className={styles.gear}
        style={{ animationDuration: `${dur}s`, animationDirection: dir < 0 ? 'reverse' : 'normal' }}
      >
        <circle r={r} />
        <circle r={r * 0.58} />
        <circle r={r * 0.14} />
        <path d={`M${-r * 0.58} 0H${r * 0.58}M0 ${-r * 0.58}V${r * 0.58}`} />
        {Array.from({ length: teeth }).map((_, i) => (
          <rect
            key={i}
            x={-toothW / 2}
            y={-(r + 18)}
            width={toothW}
            height={18}
            transform={`rotate(${(360 / teeth) * i})`}
          />
        ))}
      </g>
    </g>
  );
}

function Pulse({ axis, at, from, to, dur, delay, d, ids }) {
  const forward = to > from;
  const travel = Math.abs(to - from) - PULSE;
  const start = forward ? from : from - PULSE;
  const horizontal = axis === 'x';
  const grad = horizontal ? (forward ? ids.right : ids.left) : (forward ? ids.down : ids.up);

  return (
    <rect
      className={`${styles.pulse} ${d ? styles.desktopOnly : ''}`}
      x={horizontal ? start : at - 1}
      y={horizontal ? at - 1 : start}
      width={horizontal ? PULSE : 2}
      height={horizontal ? 2 : PULSE}
      fill={`url(#${grad})`}
      style={{
        '--travel': `${forward ? travel : -travel}px`,
        animationName: horizontal ? styles.pulseX : styles.pulseY,
        animationDuration: `${dur}s`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

export default function HeaderSchematic({ variant = 'full' }) {
  const scene = SCENES[variant] ?? SCENES.full;
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);
  const uid = useId().replace(/:/g, '');
  const ids = {
    minor: `hs-minor-${uid}`,
    major: `hs-major-${uid}`,
    fade: `hs-fade-${uid}`,
    mask: `hs-mask-${uid}`,
    scan: `hs-scan-${uid}`,
    right: `hs-r-${uid}`,
    left: `hs-l-${uid}`,
    down: `hs-d-${uid}`,
    up: `hs-u-${uid}`,
  };

  // Pause when the header leaves the viewport or the tab is hidden
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let onScreen = true;
    const sync = () => setPaused(!onScreen || document.hidden);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  const { w, h } = scene;
  const pulseStop = { stopColor: 'var(--color-green-bright)' };

  return (
    <svg
      ref={ref}
      className={`${styles.schematic} ${paused ? styles.paused : ''}`}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={ids.minor} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" className={styles.gridMinor} />
        </pattern>
        <pattern id={ids.major} width="120" height="120" patternUnits="userSpaceOnUse">
          <rect width="120" height="120" fill={`url(#${ids.minor})`} />
          <path d="M120 0H0V120" className={styles.gridMajor} />
        </pattern>

        {/* Calm behind the title (left), active on the right */}
        <linearGradient id={ids.fade} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id={ids.mask}>
          <rect width={w} height={h} fill={`url(#${ids.fade})`} />
        </mask>

        <linearGradient id={ids.scan} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--color-green-light)' }} stopOpacity="0" />
          <stop offset="0.5" style={{ stopColor: 'var(--color-green-light)' }} stopOpacity="0.12" />
          <stop offset="1" style={{ stopColor: 'var(--color-green-light)' }} stopOpacity="0" />
        </linearGradient>

        {/* Pulse heads: bright leading edge, fading tail */}
        <linearGradient id={ids.right} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" style={pulseStop} stopOpacity="0" />
          <stop offset="1" style={pulseStop} stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id={ids.left} x1="1" x2="0" y1="0" y2="0">
          <stop offset="0" style={pulseStop} stopOpacity="0" />
          <stop offset="1" style={pulseStop} stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id={ids.down} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" style={pulseStop} stopOpacity="0" />
          <stop offset="1" style={pulseStop} stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id={ids.up} x1="0" x2="0" y1="1" y2="0">
          <stop offset="0" style={pulseStop} stopOpacity="0" />
          <stop offset="1" style={pulseStop} stopOpacity="0.25" />
        </linearGradient>
      </defs>

      <rect width={w} height={h} fill={`url(#${ids.major})`} />

      <g mask={`url(#${ids.mask})`}>
        {/* Scan line sweeping down the drawing */}
        <rect
          className={`${styles.scan} ${styles.desktopOnly}`}
          x="0"
          y={-140}
          width={w}
          height="140"
          fill={`url(#${ids.scan})`}
          style={{ '--sweep': `${h + 140}px` }}
        />

        <g className={styles.traces}>
          {scene.traces.map((t) => (
            <path key={t.p} d={t.p} className={t.d ? styles.desktopOnly : undefined} />
          ))}
        </g>

        <g className={styles.pads}>
          {scene.pads.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x - 4} y={y - 4} width="8" height="8" />
          ))}
        </g>

        <rect
          className={styles.live}
          x={scene.live[0] - 4}
          y={scene.live[1] - 4}
          width="8"
          height="8"
        />

        {scene.pulses.map((p, i) => (
          <Pulse key={i} {...p} ids={ids} />
        ))}

        <g className={styles.gears}>
          {scene.gears.map((g, i) => (
            <Gear key={i} {...g} />
          ))}
        </g>
      </g>
    </svg>
  );
}
