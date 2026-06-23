/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Clean URL for the "מילון עוקף אגו" lead magnet (static file in /public)
      { source: '/milon', destination: '/milon.html' },
    ];
  },
};
module.exports = nextConfig;
