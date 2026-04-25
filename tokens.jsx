// Design tokens

const PALETTES = {
  peach: {
    bg: '#F5EEE4',
    surface: '#FFFBF5',
    surfaceAlt: '#FCF3E6',
    ink: '#2B2420',
    inkSoft: '#6B5D54',
    inkFaint: '#A69385',
    good: '#8B9D77',      // sage
    ok: '#D4A574',        // honey
    warn: '#D88A5F',      // terracotta
    bad: '#C25A4F',       // brick (still warm, not alarming red)
    accent: '#D88A5F',
    scoreBg: '#F4D9C4',
    line: 'rgba(43, 36, 32, 0.08)',
  },
  sage: {
    bg: '#F1F0E8',
    surface: '#FAFAF3',
    surfaceAlt: '#F4F3E8',
    ink: '#2A2E24',
    inkSoft: '#5E6355',
    inkFaint: '#97998C',
    good: '#7A9063',
    ok: '#C7AE7C',
    warn: '#C89168',
    bad: '#B56455',
    accent: '#7A9063',
    scoreBg: '#D9DFC9',
    line: 'rgba(42, 46, 36, 0.08)',
  },
  rose: {
    bg: '#F7EEEE',
    surface: '#FFF7F6',
    surfaceAlt: '#FBE9E6',
    ink: '#2E2328',
    inkSoft: '#6E5A61',
    inkFaint: '#A89098',
    good: '#9AA878',
    ok: '#D4A979',
    warn: '#D18370',
    bad: '#B85A59',
    accent: '#D18370',
    scoreBg: '#F2D3CD',
    line: 'rgba(46, 35, 40, 0.08)',
  },
  cobalt: {
    bg: '#EEF1F5',
    surface: '#F8FAFD',
    surfaceAlt: '#E4EAF2',
    ink: '#1F2833',
    inkSoft: '#556274',
    inkFaint: '#8E99A8',
    good: '#6E8EB0',
    ok: '#C6A876',
    warn: '#C88268',
    bad: '#B05651',
    accent: '#4A6A90',
    scoreBg: '#D6E0EC',
    line: 'rgba(31, 40, 51, 0.08)',
  },
};

const DENSITY = {
  cozy: {
    pad: 20,
    gap: 16,
    cardPad: 20,
    titleSize: 28,
    sectionGap: 24,
    radius: 24,
  },
  compact: {
    pad: 16,
    gap: 10,
    cardPad: 14,
    titleSize: 24,
    sectionGap: 16,
    radius: 18,
  },
};

function useTokens() {
  const T = window.TWEAKS || {};
  const pal = PALETTES[T.palette] || PALETTES.peach;
  const den = DENSITY[T.density] || DENSITY.cozy;
  return { pal, den, T };
}

Object.assign(window, { PALETTES, DENSITY, useTokens });
