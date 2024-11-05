/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    deviceSizes: [640, 750],
    imageSizes: [16, 32, 64, 128, 256, 384, 512],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  env: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    NEXT_PUBLIC_SPOTIFY_REDIRECT_URI:
      process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
    MONGODB_URI: process.env.MONGODB_URI,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.dandigresses.co.uk',
          },
        ],
        destination: 'https://dandigresses.co.uk/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
