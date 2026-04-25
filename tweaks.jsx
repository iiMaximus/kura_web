// Tweaks panel

function TweaksPanel({ enabled, tweaks, onChange }) {
  if (!enabled) return null;

  const row = (label, value, options) => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: '#6B5D54', textTransform: 'uppercase',
                    letterSpacing: 0.8, marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {options.map(opt => (
          <button key={opt.k} onClick={() => onChange(label.toLowerCase(), opt.k)} style={{
            padding: '6px 10px', borderRadius: 99,
            background: value === opt.k ? '#2B2420' : '#F5EEE4',
            color: value === opt.k ? '#FFFBF5' : '#2B2420',
            border: 'none', cursor: 'pointer',
            fontSize: 12, fontWeight: 700, fontFamily: 'Nunito',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            {opt.swatch && (
              <span style={{
                width: 10, height: 10, borderRadius: 5,
                background: opt.swatch, border: '1px solid rgba(0,0,0,0.1)',
              }}/>
            )}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="tweaks-panel">
      <div style={{
        fontFamily: 'Fraunces, serif', fontSize: 16, color: '#2B2420',
        marginBottom: 12, letterSpacing: -0.1,
      }}>Tweaks</div>

      {row('Palette', tweaks.palette, [
        { k: 'peach',  label: 'Peach',  swatch: '#F4D9C4' },
        { k: 'sage',   label: 'Sage',   swatch: '#D9DFC9' },
        { k: 'rose',   label: 'Rose',   swatch: '#F2D3CD' },
        { k: 'cobalt', label: 'Cobalt', swatch: '#D6E0EC' },
      ])}

      {row('Layout', tweaks.layout, [
        { k: 'hero', label: 'Hero dial' },
        { k: 'split', label: 'Split card' },
        { k: 'editorial', label: 'Editorial' },
      ])}

      {row('Density', tweaks.density, [
        { k: 'cozy', label: 'Cozy' },
        { k: 'compact', label: 'Compact' },
      ])}

      <div style={{
        fontSize: 11, color: '#A69385', marginTop: 8, lineHeight: 1.4,
      }}>Layout affects the result screen hero.</div>
    </div>
  );
}

Object.assign(window, { TweaksPanel });
