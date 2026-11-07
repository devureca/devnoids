// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

const isDev = process.argv.includes("dev");

export default defineConfig({
  output: "static",
  integrations: [react(), markdoc(), ...(isDev ? [keystatic()] : [])],
  vite: {
    plugins: [tailwindcss()],
  },
});