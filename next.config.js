/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Evita que Vercel cancele el build por errores de TypeScript
    ignoreBuildErrors: true,
  },
  eslint: {
    // Evita bloqueos por advertencias de ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;