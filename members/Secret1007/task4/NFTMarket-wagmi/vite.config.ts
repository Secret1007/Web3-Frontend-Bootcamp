import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), UnoCSS()],
    resolve: {
        alias: {
            "@": "/src",
        },
    },
});
