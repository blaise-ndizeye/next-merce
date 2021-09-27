module.exports = {
  reactStrictMode: process.env.NODE_ENV === "production" ? false : true,
  images: {
    domains: ["localhost"],
  },
  env: {
    ROOT: __dirname,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}
