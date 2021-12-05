/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY || "",
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
