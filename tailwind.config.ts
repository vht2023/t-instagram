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
                tablet: "765px",
                // => @media (min-width: 640px) { ... }

                laptop: "1024px",
                // => @media (min-width: 1024px) { ... }

                desktop: "1281px",
                // => @media (min-width: 1280px) { ... }
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
export default config;
