import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                tablet: "768px",
                laptop: "1024px",
                desktop: "1280px",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
export default config;
