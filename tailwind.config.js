module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#409EFF",
        success: "#67C23A",
        danger: "#F56C6C",
        warning: "#E6A23C",
        info: "#909399"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
