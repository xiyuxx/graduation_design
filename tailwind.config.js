/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
          typography: {
              DEFAULT: {
                  css: {
                      h1: {
                          fontSize: '2.25rem',
                          fontWeight: '700',
                      },
                      h2: {
                          fontSize: '1.875rem',
                          fontWeight: '700',
                      },
                      // 您可以在这里添加更多的 h3、h4 等标签的样式
                  },
              },
          },
      },
  },
  plugins: [],
}

