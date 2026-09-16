const withPWA = require("next-pwa")({
  dest: "public",       // dónde se guarda el service worker
  register: true,       // registra automáticamente el SW
  skipWaiting: true     // activa el SW nuevo sin esperar
});

module.exports = withPWA({
  reactStrictMode: true // o cualquier otra config que ya tengas
});
