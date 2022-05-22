/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY || "",
    BASE_URL: process.env.BASE_URL || "",
    ENDPOINT_URL: process.env.ENDPOINT_URL || "",
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
