import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Sora", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        charcoal: "hsl(var(--charcoal))",
        "off-white": "hsl(var(--off-white))",
        "forest-green": "hsl(var(--forest-green))",
        "water-blue": "hsl(var(--water-blue))",
        "soft-cream": "hsl(var(--soft-cream))",
      },
      fontSize: {
        'xs': ['clamp(0.75rem, 0.1vw + 0.7rem, 0.75rem)', { lineHeight: '1rem' }],
        'sm': ['clamp(0.8rem, 0.15vw + 0.75rem, 0.875rem)', { lineHeight: '1.25rem' }],
        'base': ['clamp(0.9375rem, 0.2vw + 0.85rem, 1rem)', { lineHeight: '1.5rem' }],
        'lg': ['clamp(1rem, 0.3vw + 0.9rem, 1.125rem)', { lineHeight: '1.75rem' }],
        'xl': ['clamp(1.125rem, 0.5vw + 0.95rem, 1.25rem)', { lineHeight: '1.75rem' }],
        '2xl': ['clamp(1.25rem, 1vw + 0.9rem, 1.5rem)', { lineHeight: '2rem' }],
        '3xl': ['clamp(1.5rem, 1.5vw + 1rem, 1.875rem)', { lineHeight: '2.25rem' }],
        '4xl': ['clamp(1.875rem, 2vw + 1.25rem, 2.25rem)', { lineHeight: '2.5rem' }],
        '5xl': ['clamp(2.25rem, 3vw + 1.25rem, 3rem)', { lineHeight: '1.1' }],
        '6xl': ['clamp(3rem, 4vw + 1.5rem, 3.75rem)', { lineHeight: '1.1' }],
        '7xl': ['clamp(3.75rem, 5vw + 1.75rem, 4.5rem)', { lineHeight: '1.1' }],
        '8xl': ['clamp(4.5rem, 6vw + 2rem, 6rem)', { lineHeight: '1.1' }],
        '9xl': ['clamp(5.5rem, 8vw + 2rem, 8rem)', { lineHeight: '1.1' }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        glow: "var(--shadow-glow)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
