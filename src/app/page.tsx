'use client'

import { PauseIcon, PlayIcon } from '@/components/Icons'
import { SimpleLayout } from '@/components/SimpleLayout'
import { SongPlayButton } from '@/components/SongPlayButton'

import { Song } from '@/providers/audio'
import { useLayout } from '@/providers/layout'

const chewingGum: Song = {
  title: 'Chewing Gum - Dan Edwards (ft. rowan) [clip]',
  slug: 'chewing-gum',
}

function TestButtons() {
  const { showAudioPlayer, setShowAudioPlayer } = useLayout()

  return (
    <div className="flex justify-center my-4 gap-4">
      <SongPlayButton song={chewingGum} playing={undefined} paused={undefined} />

      <SongPlayButton
        song={chewingGum}
        className="flex items-center gap-x-3 text-sm font-bold leading-6 text-blue-500 hover:text-blue-700 active:text-blue-900"
        playing={
          <>
            <PauseIcon className="h-2.5 w-2.5 fill-current" />
            <span aria-hidden="true">Listen</span>
          </>
        }
        paused={
          <>
            <PlayIcon className="h-2.5 w-2.5 fill-current" />
            <span aria-hidden="true">Listen</span>
          </>
        }
      />

      <button
        onClick={() => setShowAudioPlayer(!showAudioPlayer)}
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 
      text-white font-bold rounded-lg shadow-lg 
      border-2 border-purple-700
      transition-all duration-200
      hover:scale-105 hover:shadow-xl
      active:scale-95
      mb-6 mx-auto"
      >
        Toggle AudioPlayer
      </button>
    </div>
  )
}

export default function Page() {
  const bulldogParagraphs = [
    'English Bulldogs are known for their wrinkled faces and gentle personalities. They make wonderful family pets and are particularly good with children. Despite their tough appearance, they are actually very sweet and patient dogs.',
    'Bulldogs often snore and make funny noises while sleeping. Their distinctive breathing sounds come from their short snouts. Many bulldog owners find these sounds endearing rather than annoying.',
    'These dogs do not need much exercise. A short walk each day is usually enough to keep them healthy. They prefer to spend most of their time lounging around and napping on comfortable surfaces.',
    'Bulldog puppies are incredibly playful and energetic. They love to chase toys and play games with their owners. However, they quickly tire out and need plenty of rest between play sessions.',
    'The breed has a rich history in England, where they were originally bred for bull baiting. Today, they serve as loving companions and are popular mascots for many sports teams and universities.',
    'Regular grooming is important for bulldogs. Their wrinkles need to be kept clean and dry to prevent skin problems. Many bulldogs enjoy being pampered during their grooming sessions.',
    'These dogs have a strong bond with their families. They often follow their owners from room to room, always wanting to be part of the action. They are known for their loyalty and devotion.',
    'Bulldogs can be stubborn during training, but they respond well to positive reinforcement. Treats and praise work better than strict discipline when teaching them new tricks or commands.',
    'Despite their somewhat grumpy expression, bulldogs are usually very friendly with strangers. They make terrible guard dogs because they tend to welcome everyone with equal enthusiasm.',
    'The average bulldog weighs between forty and fifty pounds. They have a sturdy, low-to-the-ground build that makes them very stable. Their distinctive walk is more of a waddle than a stride.',
  ]

  return (
    <SimpleLayout title={`Dan Edwards creative`} intro={`Pop music producer & songwriter in Salisbury, UK`}>
      <TestButtons />
      {bulldogParagraphs.map((text, i) => (
        <p key={i} className="mb-4">
          {text}
        </p>
      ))}
      <TestButtons />
      <p className="py-3 font-semibold">This is the final paragraph in the main content area.</p>
    </SimpleLayout>
  )
}
