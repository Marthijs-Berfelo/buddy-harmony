// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        '2xl': '42rem',
      },
    },
  },
  plugins: [],
});
