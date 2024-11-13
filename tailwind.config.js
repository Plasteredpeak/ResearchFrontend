export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        emerald: {
          ...require("daisyui/src/theming/themes")["emerald"],
          secondary: "#1F2937",
          primary: "#3b9aa2",
          fontFamily: "Helvetica, Arial, sans-serif",
        },
      },
    ],
  },
};
