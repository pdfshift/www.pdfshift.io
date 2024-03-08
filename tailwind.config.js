/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue"
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    700: '#0A0C3D',
                    // 800: '#1B0E4A',
                    900: '#1a0e49',
                },
                purple: {
                    DEFAULT: '#6C47FF',
                    100: '#F3EFFF', //light
                    400: '#C6B2FF', //3rd (mid)
                    500: '#9277FF', //2nd
                    700: '#6C47FF', //primary
                    900: '#3C268E',
                    950: '#28107E',
                },
                cyan: '#17CCFC',
                gray: {
                    200: '#DBE4F2',
                    300: '#CACACA',
                    400: '#626262',
                    600: '#4C556D',
                },
                green: {
                    DEFAULT: '#3AC66A',
                },
                orange: '#FF9D28',
            },
            fontFamily: {
                dm: ['DM Sans', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            fontSize: {
                '5xl': '2.75rem',
                '6xl': "3rem",
            },
            spacing: {
                '18' : '4.5rem',
            }
        }
    },
    plugins: []
}

