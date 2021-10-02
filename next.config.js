module.exports = {
  reactStrictMode: process.env.NODE_ENV === "production" ? false : true,
  env: {
    ROOT: __dirname,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}
