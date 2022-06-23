/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ecommerce-strapi-practice.herokuapp.com", "localhost"],
  },
};

module.exports = nextConfig;
