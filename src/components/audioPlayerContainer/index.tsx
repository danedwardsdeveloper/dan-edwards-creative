import clsx from 'clsx'

import { AudioPlayer } from './AudioPlayer'
import { useLayout } from '@/providers/layout'

export default function AudioPlayerContainer() {
  const { showAudioPlayer, setShowAudioPlayer } = useLayout()

  return (
    <div className="fixed bottom-0 w-full">
      <div
        className={clsx(
          'transform transition-all duration-300 ease-in-out',
          'overflow-visible',
          'lg:-mx-8',
          showAudioPlayer ? 'h-[113px]' : 'h-0',
        )}
      >
        <AudioPlayer onDismiss={() => setShowAudioPlayer(false)} />
      </div>
    </div>
  )
}
