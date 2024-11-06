import {
  AppleMusicIcon,
  InstagramIcon,
  SpotifyIcon,
  TwitterIcon,
  YouTubeMusicIcon,
} from '@/components/Icons'
import { productionBaseURL } from '@/library/environment'
import { Metadata } from 'next'
import { LinkItemInterface } from './components/LinkCard'

export const metadata: Metadata = {
  title: `Links | Dan Edwards, pop music producer and songwriter in Salisbury, UK.`,
  description: `Links page for Dan Edwards - a classically trained professional pop music producer and song writer in Salisbury, Wiltshire, UK.`,
  alternates: {
    canonical: `${productionBaseURL}/links`,
  },
}

export const musicLinkItems: LinkItemInterface[] = [
  {
    title: 'Listen on Spotify',
    href: 'https://open.spotify.com/user/1123306625?si=800c1f9aea304e42',
    icon: SpotifyIcon,
    description: 'Follow my official Spotify artist profile',
    analyticsName: 'spotify-artist-profile',
  },
  {
    title: 'Listen on Apple Music',
    href: 'https://music.apple.com/us/artist/dan-edwards/1716619818',
    icon: AppleMusicIcon,
    description: 'Subscribe to my Apple Music artist profile',
    analyticsName: 'apple-music-artist-profile',
  },
  {
    title: 'Listen on YouTube Music',
    href: 'https://music.youtube.com/channel/UCUSPxPa0YVfQdFxjD7uog2Q?si=4n7I5xmFdifB-cEM',
    icon: YouTubeMusicIcon,
    description: 'Subscribe to my YouTube Music artist profile',
    analyticsName: 'youtube-music-artist-profile',
  },
  {
    title: 'Follow me on Instagram',
    href: 'https://www.instagram.com/prod_danedwards/',
    icon: InstagramIcon,
    description: `I hate social media but whatever`,
    analyticsName: 'instagram-profile',
  },
  {
    title: 'Follow me on Twitter',
    href: 'https://x.com/prod_danedwards',
    icon: TwitterIcon,
    description: `But don't waste your life arguing with bots!`,
    analyticsName: 'twitter-profile',
  },
]
