/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: '#3b82f6', // 清爽冷蓝主色
        dark: {
          bg: '#0f172a', // 冷深蓝
          card: '#1e293b', // 冷蓝卡面
          text: '#e2e8f0', // 冷白
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['"Noto Serif SC"', '"Noto Serif"', '"Songti SC"', '"SimSun"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
