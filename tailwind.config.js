/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                "track-list": "55% auto 6ch min-content"
            },
            colors: {
                transparent: "transparent",
                current: "currentColor",
                primary: "#1ED760",
                black: {
                    lightest: "#282828",
                    light: "#181818",
                    medium: "#121212",
                    heavy: "#000000"
                },
                gray: {
                    lightest: "#B3B3B3",
                    light: "#727272",
                    medium: "#5E5E5E"
                },
                white: {
                    bright: "#FFFFFF"
                },
                green: {
                    main: "#61CC6A",
                    deeper: "#378865",
                    medium: "#145237",
                    darker: "#0C2513",
                    darkest: "#0C2513"
                }
            }
        }
    },
    plugins: []
};
