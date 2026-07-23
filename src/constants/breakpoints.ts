export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
} as const;

export const mediaQueries = {
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  "2xl": `(min-width: ${breakpoints["2xl"]}px)`,

  smMax: `(max-width: ${breakpoints.sm - 1}px)`,
  mdMax: `(max-width: ${breakpoints.md - 1}px)`,
  lgMax: `(max-width: ${breakpoints.lg - 1}px)`,
  xlMax: `(max-width: ${breakpoints.xl - 1}px)`,

  motionSafe: "(prefers-reduced-motion: no-preference)",
  motionReduce: "(prefers-reduced-motion: reduce)",
  darkMode: "(prefers-color-scheme: dark)",
  lightMode: "(prefers-color-scheme: light)",
} as const;
