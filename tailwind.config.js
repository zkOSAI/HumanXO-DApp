module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {

      },
      fontFamily: {
        dynapuff: ['DynaPuff', 'cursive'],
        montserrat: ['Montserrat', 'cursive'],
        twkeverett: ['TWKEverett', 'cursive'],
      },
    },
  },
  plugins: [],
};
