import type { Config } from 'tailwindcss'

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * LEGALO — TAILWIND CONFIGURATION
 * Gulf Emerald + Desert Sand design system
 * 
 * This config references CSS custom properties defined in src/styles/globals.css
 * DO NOT hardcode color values here — they are defined in globals.css as tokens.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx,js,jsx,mdx}',
    './app/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    /* ════════════════════════════════════════════════════════════════════════
       FONT FAMILIES
       ════════════════════════════════════════════════════════════════════════ */
    fontFamily: {
      'inter-tight': ['var(--font-inter-tight)', 'system-ui', 'sans-serif'],
      'ibm-plex-arabic': ['var(--font-ibm-plex-arabic)', 'system-ui', 'sans-serif'],
      sans: ['var(--font-inter-tight)', 'system-ui', 'sans-serif'],
      'font-arabic': ['var(--font-ibm-plex-arabic)', 'system-ui', 'sans-serif'],
    },

    /* ════════════════════════════════════════════════════════════════════════
       BORDER RADIUS — aligned with globals.css
       ════════════════════════════════════════════════════════════════════════ */
    borderRadius: {
      sm: 'var(--radius-sm)',        // 6px
      md: 'var(--radius-md)',        // 10px
      lg: 'var(--radius-lg)',        // 16px
      xl: 'var(--radius-xl)',        // 24px
      '2xl': 'var(--radius-2xl)',    // 32px
      pill: 'var(--radius-pill)',    // 999px
    },

    /* ════════════════════════════════════════════════════════════════════════
       EXTENDED THEME
       All colors reference CSS custom properties from globals.css
       ════════════════════════════════════════════════════════════════════════ */
    extend: {
      /* ─────────────────────────────────────────────────── COLORS ─── */
      colors: {
        /* Gulf Emerald palette */
        'emerald-50': 'var(--color-emerald-50)',
        'emerald-100': 'var(--color-emerald-100)',
        'emerald-200': 'var(--color-emerald-200)',
        'emerald-300': 'var(--color-emerald-300)',
        'emerald-400': 'var(--color-emerald-400)',
        'emerald-500': 'var(--color-emerald-500)',
        'emerald-600': 'var(--color-emerald-600)',
        'emerald-700': 'var(--color-emerald-700)',
        'emerald-800': 'var(--color-emerald-800)',
        'emerald-900': 'var(--color-emerald-900)',
        'emerald-950': 'var(--color-emerald-950)',

        /* Desert Sand palette */
        'sand-50': 'var(--color-sand-50)',
        'sand-100': 'var(--color-sand-100)',
        'sand-200': 'var(--color-sand-200)',
        'sand-300': 'var(--color-sand-300)',
        'sand-400': 'var(--color-sand-400)',
        'sand-500': 'var(--color-sand-500)',
        'sand-600': 'var(--color-sand-600)',
        'sand-700': 'var(--color-sand-700)',
        'sand-800': 'var(--color-sand-800)',
        'sand-900': 'var(--color-sand-900)',
        'sand-950': 'var(--color-sand-950)',

        /* Warm Ink palette */
        'ink-50': 'var(--color-ink-50)',
        'ink-100': 'var(--color-ink-100)',
        'ink-200': 'var(--color-ink-200)',
        'ink-300': 'var(--color-ink-300)',
        'ink-400': 'var(--color-ink-400)',
        'ink-500': 'var(--color-ink-500)',
        'ink-600': 'var(--color-ink-600)',
        'ink-700': 'var(--color-ink-700)',
        'ink-800': 'var(--color-ink-800)',
        'ink-900': 'var(--color-ink-900)',
        'ink-950': 'var(--color-ink-950)',

        /* Trust signals */
        'trust-green': 'var(--color-trust-green)',
        'trust-blue': 'var(--color-trust-blue)',
        'trust-gold': 'var(--color-trust-gold)',

        /* Surfaces */
        'surface-white': 'var(--color-surface-white)',
        'surface-cream': 'var(--color-surface-cream)',

        /* Destructive */
        destructive: 'var(--color-destructive)',
        'destructive-hover': 'var(--color-destructive-hover)',

        /* Semantic tokens */
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
          hover: 'var(--color-primary-hover)',
          pressed: 'var(--color-primary-pressed)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },
      },

      /* ─────────────────────────────────────────────────── SHADOWS ─── */
      boxShadow: {
        'key': 'var(--shadow-key)',
        'ambient': 'var(--shadow-ambient)',
        'lifted': 'var(--shadow-lifted)',
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
      },

      /* ─────────────────────────────────────────────────── SPACING ─── */
      spacing: {
        '18': '4.5rem',  // 72px — for hero section spacing
      },

      /* ─────────────────────────────────────────────────── TYPOGRAPHY ─── */
      fontSize: {
        'display-hero': ['clamp(36px, 6vw, 64px)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-large': ['clamp(32px, 4vw, 48px)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
    },
  },
  plugins: [],
}

export default config
