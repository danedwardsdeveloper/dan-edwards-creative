import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    deviceSizes: [640, 750],
    imageSizes: [16, 32, 64, 128, 256, 384, 512],
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        /* cspell:disable */
        hostname: 'd1zazl06f7w9hx.cloudfront.net',
        /* cspell:enable */
        pathname: '/**',
      },
    ],
  },
  serverExternalPackages: ['pino', 'pino-pretty'],
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.danedwardscreative.com',
          },
        ],
        destination: 'https://danedwardscreative.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
