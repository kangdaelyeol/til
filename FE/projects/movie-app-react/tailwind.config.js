/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', 'src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                'color-black': '#0e111b',
                'color-white': '#fff',
                'color-white-50': 'rgba(255, 255, 255, 0.5)',
                'color-white-30': 'rgba(255, 255, 255, 0.3)',
                'color-white-20': 'rgba(255, 255, 255, 0.2)',
                'color-white-10': 'rgba(255, 255, 255, 0.1)',
                'color-white-5': 'rgba(255, 255, 255, 0.05)',

                'color-primary': '#fdc000',
                'color-hover': '#86a05',
                'color-area': '#1c212e',
            },
        },
        screens: {
            mob: '600px',
            'mob-lg': '720px',
            tablet: '1200px',
        },
    },
    plugins: [],
}
