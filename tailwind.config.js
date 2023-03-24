/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                "track-list": "auto 1fr 1fr  100px"
            }
        }
    },
    plugins: []
};
