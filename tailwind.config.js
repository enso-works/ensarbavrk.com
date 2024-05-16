const daisyui = require('daisyui');
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        readable: '65ch',
      },
      colors: {
        primary: 'var(--color-text-accent)',
        bgPrimary: 'var(--color-bg-primary)',
        text: 'var(--color-text-primary)',
        textSecondary: 'var(--color-text-primary)',
        black: '#313131',
        white: '#ffffff',
      },
    },
    fontFamily: {
      sans: ['"Quattrocento Sans"', 'sans-serif'],
    },
  },
  plugins: [daisyui],
};
