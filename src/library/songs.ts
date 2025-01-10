import glob from 'fast-glob'
import { type StaticImageData } from 'next/image'
import path from 'path'

export interface SongPageDetails {
  metadata: {
    display: boolean
    slug: string
    displayTitle: string
    metaTitle: string
    displayDescription: string
    metaDescription?: string
    YYYY_MM_DD: string
    socialImage: StaticImageData
    featuredImage: StaticImageData
  }
  content: {
    links: {
      youTubeEmbed: URL
      spotify: URL
      deezer: URL
      amazon: URL
      youTubeMusic: URL
      apple: URL
    }
  }
}

export async function getArticleData(slug: string): Promise<SongPageDetails | null> {
  try {
    const contentModule = await import(`../app/songs/${slug}/data`)
    return contentModule.article as SongPageDetails
  } catch (error) {
    console.error(`Error reading ${slug}:`, error)
    return null
  }
}

export async function getAllArticles(): Promise<SongPageDetails[]> {
  try {
    const songPaths = await glob('src/app/songs/*', {
      onlyDirectories: true,
    })

    const songs = await Promise.all(
      songPaths.map(async projectPath => {
        const slug = path.basename(projectPath)
        return await getArticleData(slug)
      }),
    )

    return songs
      .filter((songPageDetails): songPageDetails is SongPageDetails => songPageDetails !== null)
      .filter(songPageDetails => songPageDetails.display)
      .sort((a, b) => {
        const dateA = new Date(a.YYYY_MM_DD)
        const dateB = new Date(b.YYYY_MM_DD)
        return dateB.getTime() - dateA.getTime()
      })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}
