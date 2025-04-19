// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        colors: {
          'students-color': '#079992',
          'students-color-hover':'#0a3d62',
        },
        screens: {
          '3xl': '1800px',
          '4xl': '2100px',
        },
          perspective: {
            DEFAULT: '1000px',
          },
          transformOrigin: {
            center: 'center',
          },
        },
      },
    plugins: [
      function ({ addUtilities }) {
        addUtilities({
          '.perspective': {
            perspective: '1000px',
          },
          '.preserve-3d': {
            transformStyle: 'preserve-3d',
          },
          '.backface-hidden': {
            backfaceVisibility: 'hidden',
          },
          '.rotate-y-180': {
            transform: 'rotateY(180deg)',
          },
          '.hover\\:rotate-y-180:hover': {
            transform: 'rotateY(180deg)',
          },
        });
      },
    ],
  }
  