// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  modules: ["@vueform/nuxt"],
  devtools: { enabled: true },
  devServer: {
    port: 8000,
  },
  // alias: {
  //   "@": resolve(__dirname, "/"),
  // },
  components: {
    dirs: [
      {
        global: true,
        path: "~/components",
        extensions: ["vue"],
      },
      {
        global: true,
        path: "~/components/global",
        pathPrefix: false,
        extensions: ["vue"],
      },
    ],
  },
  // css: ["~/assets/main.css"],
  app: {
    head: {
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
          integrity:
            "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM",
          crossorigin: "anonymous",
        },
      ],
      link: [
        { rel: "icon", type: "image/jpg", href: "/favicon.ico" },
        {
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
          rel: "stylesheet",
          integrity:
            "sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600&display=swap",
        },
      ],
    },
  },
});
