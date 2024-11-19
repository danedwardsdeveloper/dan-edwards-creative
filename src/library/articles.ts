import glob from 'fast-glob'
import { type StaticImageData } from 'next/image'
import path from 'path'

export interface Article {
  title: string
  display: boolean
  displayDescription: string
  metaDescription?: string
  date: string
  socialImage: StaticImageData
}

export interface ArticleWithSlug extends Article {
  slug: string
  type: 'article' | 'song' // Add type to distinguish between articles and songs
}

export async function getArticleData(
  slug: string,
  type: 'article' | 'song',
): Promise<ArticleWithSlug | null> {
  try {
    // Import from the correct directory based on type, using a different variable name
    const contentModule = await import(`../app/${type}s/${slug}/data`)
    const data = contentModule.article as Article

    return {
      ...data,
      slug,
      type,
    }
  } catch (error) {
    console.error(`Error reading ${type} ${slug}:`, error)
    return null
  }
}

export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  try {
    const articlePaths = await glob('src/app/articles/*', {
      onlyDirectories: true,
    })
    const songPaths = await glob('src/app/songs/*', {
      onlyDirectories: true,
    })

    // Process articles
    const articles = await Promise.all(
      articlePaths.map(async projectPath => {
        const slug = path.basename(projectPath)
        return await getArticleData(slug, 'article')
      }),
    )

    // Process songs
    const songs = await Promise.all(
      songPaths.map(async projectPath => {
        const slug = path.basename(projectPath)
        return await getArticleData(slug, 'song')
      }),
    )

    const allContent = [...articles, ...songs]

    return allContent
      .filter((project): project is ArticleWithSlug => project !== null)
      .filter(project => project.display)
      .sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateB.getTime() - dateA.getTime()
      })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}
