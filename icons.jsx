// Stroke icons — minimal, rounded, parent-friendly

const Icon = ({ size = 22, stroke = 'currentColor', fill = 'none', sw = 1.8, children, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {children}
  </svg>
);

const IconScan = (p) => (
  <Icon {...p}>
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <path d="M3 12h18" />
  </Icon>
);

const IconLeaf = (p) => (
  <Icon {...p}>
    <path d="M11 20A7 7 0 0 1 4 13V6.5c0-.83.67-1.5 1.5-1.5H12a7 7 0 0 1 7 7v1" />
    <path d="M19 13c0 4-3 7-7 7" />
    <path d="M5 21c1.5-6 4.5-10 9-12" />
  </Icon>
);

const IconDroplet = (p) => (
  <Icon {...p}>
    <path d="M12 3c-1.5 3.5-6 7-6 11a6 6 0 0 0 12 0c0-4-4.5-7.5-6-11z" />
  </Icon>
);

const IconShield = (p) => (
  <Icon {...p}>
    <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
  </Icon>
);

const IconHeart = (p) => (
  <Icon {...p}>
    <path d="M20.4 5.6a5 5 0 0 0-7 0L12 7l-1.4-1.4a5 5 0 0 0-7 7L12 21l8.4-8.4a5 5 0 0 0 0-7z" />
  </Icon>
);

const IconBook = (p) => (
  <Icon {...p}>
    <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5z" />
    <path d="M4 16.5A2.5 2.5 0 0 1 6.5 14H18" />
  </Icon>
);

const IconHome = (p) => (
  <Icon {...p}>
    <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2V10z" />
  </Icon>
);

const IconPantry = (p) => (
  <Icon {...p}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M4 9h16M4 15h16" />
    <path d="M10 6v0M10 12v0M10 18v0" />
  </Icon>
);

const IconUser = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </Icon>
);

const IconChevron = (p) => (
  <Icon {...p}>
    <path d="M9 6l6 6-6 6" />
  </Icon>
);

const IconAlert = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5" />
    <circle cx="12" cy="16.5" r="0.5" fill="currentColor" />
  </Icon>
);

const IconCheck = (p) => (
  <Icon {...p}>
    <path d="M4 12l5 5L20 6" />
  </Icon>
);

const IconSparkle = (p) => (
  <Icon {...p}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
    <path d="M19 3l.6 1.6L21 5l-1.4.4L19 7l-.6-1.6L17 5l1.4-.4L19 3z" />
  </Icon>
);

const IconFlask = (p) => (
  <Icon {...p}>
    <path d="M9 3h6v5l4.5 9a2 2 0 0 1-1.8 3H6.3a2 2 0 0 1-1.8-3L9 8V3z" />
    <path d="M9 3h6" />
    <path d="M7 14h10" />
  </Icon>
);

const IconMic = (p) => (
  <Icon {...p}>
    <rect x="9" y="3" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0" />
    <path d="M12 18v3" />
  </Icon>
);

const IconX = (p) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);

const IconBack = (p) => (
  <Icon {...p}>
    <path d="M15 6l-6 6 6 6" />
  </Icon>
);

const IconPlus = (p) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

const IconFlash = (p) => (
  <Icon {...p}>
    <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" />
  </Icon>
);

const IconFlag = (p) => (
  <Icon {...p}>
    <path d="M4 21V4" />
    <path d="M4 4h13l-2 4 2 4H4" />
  </Icon>
);

const IconInfo = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5" />
    <circle cx="12" cy="7.5" r="0.5" fill="currentColor" />
  </Icon>
);

const IconSearch = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-5-5" />
  </Icon>
);

Object.assign(window, {
  Icon, IconScan, IconLeaf, IconDroplet, IconShield, IconHeart, IconBook,
  IconHome, IconPantry, IconUser, IconChevron, IconAlert, IconCheck,
  IconSparkle, IconFlask, IconMic, IconX, IconBack, IconPlus, IconFlash,
  IconFlag, IconInfo, IconSearch,
});
