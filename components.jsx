// Shared components

const { useState, useEffect, useRef } = React;

// Small chip/pill
function Chip({ children, tone = 'ink', style }) {
  const { pal } = useTokens();
  const tones = {
    ink: { bg: 'rgba(43,36,32,0.06)', fg: pal.ink },
    good: { bg: 'rgba(139,157,119,0.18)', fg: pal.good },
    ok: { bg: 'rgba(212,165,116,0.2)', fg: '#A67B45' },
    warn: { bg: 'rgba(216,138,95,0.2)', fg: pal.warn },
    bad: { bg: 'rgba(194,90,79,0.18)', fg: pal.bad },
  };
  const t = tones[tone] || tones.ink;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 10px', borderRadius: 99,
      background: t.bg, color: t.fg,
      fontSize: 12, fontWeight: 700, letterSpacing: 0.1,
      ...style,
    }}>{children}</span>
  );
}

// Circular score dial (ring)
function ScoreDial({ score, size = 160, thick = 10, color, trackColor, label }) {
  const { pal } = useTokens();
  const c = color || (score >= 70 ? pal.good : score >= 40 ? pal.ok : pal.warn);
  const track = trackColor || pal.scoreBg;
  const r = (size - thick) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke={track} strokeWidth={thick} fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={c} strokeWidth={thick} fill="none"
                strokeDasharray={circ} strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.3,1,.3,1)' }}/>
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: 'Fraunces, serif', fontWeight: 400,
          fontSize: size * 0.36, lineHeight: 1, color: pal.ink,
          letterSpacing: -1,
        }}>{score}</div>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
          color: pal.inkSoft, textTransform: 'uppercase', marginTop: 4,
        }}>{label || 'of 100'}</div>
      </div>
    </div>
  );
}

// Card container
function Card({ children, style, onClick }) {
  const { pal, den } = useTokens();
  return (
    <div onClick={onClick} style={{
      background: pal.surface,
      borderRadius: den.radius,
      padding: den.cardPad,
      boxShadow: '0 1px 2px rgba(43,36,32,0.04), 0 8px 24px rgba(43,36,32,0.04)',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}

// Product placeholder (striped, as per aesthetic guidance)
function ProductPlaceholder({ w = 72, h = 88, label = 'cereal' }) {
  const { pal } = useTokens();
  return (
    <div style={{
      width: w, height: h, borderRadius: 10, flexShrink: 0,
      background: `repeating-linear-gradient(135deg, ${pal.surfaceAlt} 0 6px, ${pal.bg} 6px 12px)`,
      border: `1px solid ${pal.line}`,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      padding: 4, boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 8, color: pal.inkFaint,
        textTransform: 'lowercase',
      }}>{label}</div>
    </div>
  );
}

// Simple tab bar
function TabBar({ active, onTab }) {
  const { pal } = useTokens();
  const tabs = [
    { k: 'home', label: 'Home', Icon: IconHome },
    { k: 'pantry', label: 'Pantry', Icon: IconPantry },
    { k: 'scan', label: 'Scan', Icon: IconScan, primary: true },
    { k: 'learn', label: 'Learn', Icon: IconBook },
    { k: 'profile', label: 'You', Icon: IconUser },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 28, paddingTop: 10,
      background: 'linear-gradient(180deg, transparent 0%, ' + pal.bg + ' 40%)',
      zIndex: 20,
    }}>
      <div style={{
        margin: '0 16px', background: pal.surface,
        borderRadius: 28, padding: '10px 12px',
        boxShadow: '0 6px 24px rgba(43,36,32,0.08)',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      }}>
        {tabs.map(t => {
          const isActive = active === t.k;
          if (t.primary) {
            return (
              <button key={t.k} onClick={() => onTab(t.k)} style={{
                width: 56, height: 56, borderRadius: 28,
                background: pal.ink, color: pal.surface,
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: 'translateY(-14px)',
                boxShadow: '0 10px 24px rgba(43,36,32,0.24)',
              }}>
                <t.Icon size={26} sw={2} />
              </button>
            );
          }
          return (
            <button key={t.k} onClick={() => onTab(t.k)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              color: isActive ? pal.ink : pal.inkFaint,
              padding: 6,
            }}>
              <t.Icon size={22} sw={isActive ? 2.2 : 1.8}/>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3 }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Top bar (non-nav)
function TopBar({ left, right, title }) {
  const { pal } = useTokens();
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 20px', height: 44,
    }}>
      <div style={{ flex: 1 }}>{left}</div>
      {title && <div style={{
        fontFamily: 'Nunito', fontWeight: 700, fontSize: 16, color: pal.ink,
      }}>{title}</div>}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
    </div>
  );
}

// Icon button (circle)
function IconBtn({ children, onClick, size = 40, bg, fg }) {
  const { pal } = useTokens();
  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: size / 2,
      background: bg || pal.surface,
      color: fg || pal.ink,
      border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(43,36,32,0.06)',
    }}>{children}</button>
  );
}

// Bar meter
function BarMeter({ value, max = 100, color, label, hint }) {
  const { pal } = useTokens();
  const pct = Math.min(100, (value / max) * 100);
  const c = color || pal.good;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: pal.inkSoft }}>{label}</span>
        {hint && <span style={{ fontSize: 12, fontWeight: 600, color: pal.inkFaint }}>{hint}</span>}
      </div>
      <div style={{ height: 8, background: pal.scoreBg, borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`, height: '100%', background: c,
          borderRadius: 99,
          transition: 'width .8s cubic-bezier(.3,1,.3,1)',
        }} />
      </div>
    </div>
  );
}

Object.assign(window, {
  Chip, ScoreDial, Card, ProductPlaceholder, TabBar, TopBar, IconBtn, BarMeter,
});
