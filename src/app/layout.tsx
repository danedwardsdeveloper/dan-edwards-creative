import type { Metadata, Viewport } from "next";

import { productionBaseURL } from "@/library/environment";
import {
	defaultKeywords,
	defaultSocialImage,
	siteMetadata,
	siteName,
} from "@/library/metadata";

import MainContainer from "@/components/MainContainer";
import { PageViewTracker } from "@/components/PageViewTracker";
import { Providers } from "@/components/Providers";
import SplashScreen from "@/components/SplashScreen";
import AudioPlayerContainer from "@/components/audioPlayerContainer";
import DesktopMenu from "@/components/menuBars/desktopMenu";
import MobileMenu from "@/components/menuBars/mobileMenu";

import "@/styles.tailwind.css";
import Script from "next/script";

export const metadata: Metadata = {
	title: siteMetadata.home.title,
	description: siteMetadata.home.description,
	keywords: defaultKeywords,
	authors: [{ name: "Dan Edwards", url: siteMetadata.home.canonical }],
	creator: "Dan Edwards",
	publisher: siteName,
	openGraph: {
		title: siteMetadata.home.title,
		description: siteMetadata.home.description,
		url: productionBaseURL,
		siteName: siteName,
		locale: "en_GB",
		type: "website",
		images: [
			{
				url: defaultSocialImage.absoluteUrl,
				width: defaultSocialImage.width,
				height: defaultSocialImage.height,
				alt: defaultSocialImage.alt,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		images: defaultSocialImage.absoluteUrl,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: siteMetadata.home.canonical,
	},
};

export const viewport: Viewport = {
	viewportFit: "cover",
	width: "device-width",
	initialScale: 1,
};

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en-GB" className="antialiased" suppressHydrationWarning>
			<body className="h-[100dvh] flex flex-col overflow-hidden bg-zinc-50 dark:bg-black">
				<PageViewTracker />
				<Providers>
					<SplashScreen />
					<DesktopMenu />
					<MobileMenu />
					<MainContainer>{children}</MainContainer>
					<AudioPlayerContainer />
				</Providers>
				<Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
			</body>
		</html>
	);
}
