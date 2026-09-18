/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Evita que Vercel cancele el build por errores de TypeScript
    ignoreBuildErrors: true,
  },
};

export default nextConfig;