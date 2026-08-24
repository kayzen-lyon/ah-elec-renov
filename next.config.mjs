/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // optimiseur Vercel désactivé (quota d'images Hobby épuisé)
    // Autoriser les images distantes si on utilise une banque d'images de transition.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
