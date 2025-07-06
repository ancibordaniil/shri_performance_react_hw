import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [react()],
    base: "/shri_performance_react_hw/",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@assets": path.resolve(__dirname, "src/assets"),
        },
    },
    build: {
        outDir: "dist",
        assetsDir: "assets",
        assetsInlineLimit: 0,
        emptyOutDir: true,
        rollupOptions: {
            output: {
                assetFileNames: "assets/[name].[hash][extname]",
                entryFileNames: "assets/[name].[hash].js",
            },
        },
    },
});
