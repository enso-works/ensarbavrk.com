module.exports = {
  content: [],
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-text-accent)',
        bgPrimary: 'var(--color-bg-primary)',
        text: 'var(--color-text-primary)',
        textSecondary: 'var(--color-text-primary)',
      },
    },
    fontFamily: {
      sans: ['"Quattrocento Sans"', 'sans-serif'],
    },
  },
  plugins: [],
};
