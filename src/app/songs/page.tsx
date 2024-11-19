import { SimpleLayout } from '@/components/SimpleLayout'

const songs = [
  {
    title: 'Chewing Gum',
    description: 'Written by me',
    slug: 'chewing-gum',
  },
  {
    title: 'Piece of Me',
    description: 'Co-written and co-produced by me',
    slug: 'piece-of-me',
  },
  {
    title: 'Chase Me',
    description: 'Produced by me',
    slug: 'chase-me',
  },
  {
    title: 'Hard to Love',
    description: 'Produced by me',
    slug: 'hard-to-love',
  },
]

export default function SongsPage() {
  return (
    <SimpleLayout title="Songs" intro="All the songs I've written or produced" articleContent={false}>
      <div className="grid columns-1 md:columns-2">
        {songs.map(song => (
          <div key={song.slug}>
            <div className="h-32 w-32 bg-gray-200 rounded-lg" />
            <h2>{song.description}</h2>
          </div>
        ))}
      </div>
    </SimpleLayout>
  )
}
