import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {

    },
    daisyui: {
        themes: [
            "light",
            "dark",
            "cupcake",
            "bumblebee",
            "emerald",
            "cyberpunk",
            "valentine",
            "garden",
            "cmyk",
            "autumn",
            "acid",
            "night",
            "winter",
            {
                blackpink: {
                    "primary": "#DE5784",
                    "secondary": "#FA7DA5",
                    "accent": "#FFA3D4",
                    "neutral": "#251f33",
                    "base-100": "#3a2145",
                    "info": "#5175d6",
                    "success": "#CF8ED4",
                    "warning": "#b89105",
                    "error": "#e65b77",
                },

            }],
    },
    plugins: [require("daisyui")],
}
export default config
