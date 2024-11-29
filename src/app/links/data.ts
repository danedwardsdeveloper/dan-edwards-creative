import { Metadata } from 'next'

import { productionBaseURL } from '@/library/environment'

import { LinkItemInterface } from './components/LinkCard'
import { AppleMusicIcon, InstagramIcon, SpotifyIcon, TwitterIcon, YouTubeMusicIcon } from '@/components/Icons'

export const metadata: Metadata = {
  title: `Links | Dan Edwards, pop music producer and songwriter in Salisbury, UK.`,
  description: `Links page for Dan Edwards - a classically trained professional pop music producer and song writer in Salisbury, Wiltshire, UK.`,
  alternates: {
    canonical: `${productionBaseURL}/links`,
  },
}

export const streamingProfileItems: LinkItemInterface[] = [
  {
    title: 'Listen on Spotify',
    href: 'https://open.spotify.com/artist/7p3CxuHLT2LvMCl5w7brvj',
    icon: SpotifyIcon,
    ctaDescription: 'Follow my official Spotify artist profile',
    analyticsName: 'spotify-artist-profile',
    shortDescription: 'Spotify',
  },
  {
    title: 'Listen on Apple Music',
    href: 'https://music.apple.com/us/artist/dan-edwards/1716619818',
    icon: AppleMusicIcon,
    ctaDescription: 'Subscribe to my Apple Music artist profile',
    analyticsName: 'apple-music-artist-profile',
    shortDescription: 'Apple Music',
  },
  {
    title: 'Listen on YouTube Music',
    href: 'https://music.youtube.com/channel/UCUSPxPa0YVfQdFxjD7uog2Q?si=4n7I5xmFdifB-cEM',
    icon: YouTubeMusicIcon,
    ctaDescription: 'Subscribe to my YouTube Music artist profile',
    analyticsName: 'youtube-music-artist-profile',
    shortDescription: 'YouTubeMusic',
  },
]

export const socialMediaItems: LinkItemInterface[] = [
  {
    title: 'Follow me on Instagram',
    href: 'https://www.instagram.com/prod_danedwards/',
    icon: InstagramIcon,
    ctaDescription: `I hate social media but whatever`,
    analyticsName: 'instagram-profile',
    shortDescription: 'Instagram',
  },
  {
    title: 'Follow me on Twitter',
    href: 'https://x.com/prod_danedwards',
    icon: TwitterIcon,
    ctaDescription: `But don't waste your life arguing with bots!`,
    analyticsName: 'twitter-profile',
    shortDescription: 'X',
  },
]

export const allLinks: LinkItemInterface[] = [...streamingProfileItems, ...socialMediaItems]
