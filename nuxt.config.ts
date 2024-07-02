import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss"],
  plugins: [{ src: "~/plugins/vue-awesome-paginate.js", mode: "client" }],
});
