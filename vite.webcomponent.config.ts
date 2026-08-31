import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],

    define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
    },

    build: {
        outDir: "web-component",
        lib: {
            entry: "src/web-component.tsx",
            name: "DonationCalculator",
            fileName: "donation-calculator",
            formats: ["iife"],
        },
        cssCodeSplit: false,
    },
});