/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            fontFamily: {
                geist: ["Geist", "sans-serif"],
                geistMono: ["'Geist Mono'", "monospace"],
                fugazOne: ['"Fugaz One"', "sans-serif"],
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
