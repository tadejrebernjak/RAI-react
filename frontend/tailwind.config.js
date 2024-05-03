/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                ubuntusans: ["UbuntuSans"],
                montserrat: ["Montserrat"],
            },
            colors: {
                "slate-925": "#080f21",
            },
        },
    },
    plugins: [],
};
