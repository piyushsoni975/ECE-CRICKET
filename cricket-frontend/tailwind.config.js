// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        moveStars: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-10000px 5000px" },
        },
      },
      animation: {
        stars: "moveStars 200s linear infinite",
      },
    },
  },
  plugins: [],
};
