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
                    800: '#011552',
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
                'code-string': '#b2ffc3',
                orange: '#FF9D28',
            },
            fontFamily: {
                dm: ['DM Sans', 'sans-serif'],
                code: ['Source Code Pro', 'monospace'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'agent-card': 'radial-gradient(circle at 0 0, rgba(214, 199, 255, 0.1), rgba(132, 99, 255, 0.15) 50%, rgba(51, 0, 255, 0.2))',
                'agent-card-soft': 'radial-gradient(circle at 0 0, rgba(214, 199, 255, 0.1), rgba(132, 99, 255, 0.18) 50%, rgba(51, 0, 255, 0.16))',
                'agent-panel': 'linear-gradient(159deg, #e8e4ff 0%, #fff 39%, #e8e4ff 98%)',
            },
            boxShadow: {
                'agent-card': '0 8px 24px 4px rgba(108, 71, 255, 0.1)',
            },
            fontSize: {
                '5xl': '2.75rem',
                '6xl': '3rem',
            },
            lineHeight: {
                display: '1.12',
            },
            maxWidth: {
                'agent-content': '51.25rem',
                'agent-copy': '30.6875rem',
                'with-gutters': 'calc(100% - 2rem)',
            },
            height: {
                'agent-hero': '34.1875rem',
                'agent-panel': '22.9375rem',
            },
            minHeight: {
                'agent-panel': '22.9375rem',
            },
            width: {
                'with-gutters': 'calc(100% - 2rem)',
            },
            borderRadius: {
                '4xl': '1.875rem',
            },
            spacing: {
                '18': '4.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
            },
            gridTemplateColumns: {
                comparison: '395px 229px 196px',
            },
            zIndex: {
                '1': '1',
                '2': '2',
                '3': '3',
            }
        }
    },
    plugins: []
}
