export interface Song {
  title: string
  slug: string
  releaseDate: Date
}

export const chewingGum: Song = {
  title: 'Chewing Gum (ft. rowan) - Dan Edwards [PREVIEW]',
  slug: 'chewing-gum',
  releaseDate: new Date('2025-01-10T00:00:00Z'),
}

export function isReleased({ song }: { song: Song }) {
  const now = new Date()
  return now.getTime() > song.releaseDate.getTime()
}
