import { Configuration } from "@nuxt/types";
import i18n from "./src/i18n";
import { isProduct, GA } from "./src/constants";

const config: Configuration = {
  mode: "spa",
  router: {
    mode: "history",
  },
  srcDir: "./src",
  head: {
    titleTemplate: "Claps.dev",
    title: "",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no",
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        href: "/favicon.png",
      },
    ],
  },
  loading: { color: "#fff" },
  css: ["~/styles/index.scss"],
  plugins: [
    "~/plugins/components.ts",
    "~/plugins/property.ts",
    "~/plugins/libs.ts",
    "~/plugins/persistedstate.ts",
  ],
  buildModules: [
    "@nuxtjs/eslint-module",
    [
      "@nuxt/typescript-build",
      {
        typeCheck: true,
        ignoreNotFoundWarnings: true,
      },
    ],
    "@nuxtjs/vuetify",
  ],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/google-analytics",
    "@nuxtjs/dotenv",
    [
      "nuxt-i18n",
      {
        vueI18n: i18n,
        locales: ["en", "zh"],
        defaultLocale: "en",
        strategy: "no_prefix",
        detectBrowserLanguage: false,
        parsePages: false,
        seo: false,
      },
    ],
  ],
  googleAnalytics: {
    id: GA,
    dev: false,
    debug: {
      enabled: !isProduct,
      sendHitTask: isProduct,
    },
  },
  vuetify: {
    customVariables: ["~/styles/variables.scss"],
    defaultAssets: false,
    treeShake: true,
    optionsPath: "./vuetify.options.ts",
  },
  build: {
    transpile: ["vuetify"],
    extend() {},
  },
  env: {
    TOKEN: process.env.TOKEN || "",
    APP_ENV: process.env.APP_ENV || "",
  },
};

export default config;
