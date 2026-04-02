import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: "ZenX",
    permissions: ["storage"],
    icons: {
      16: "/icon/icon.png",
      32: "/icon/icon.png",
      48: "/icon/icon.png",
      96: "/icon/icon.png",
      128: "/icon/icon.png",
    },
  },
});
