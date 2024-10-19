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
};

export default nextConfig;
