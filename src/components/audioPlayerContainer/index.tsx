import { AudioPlayer } from './AudioPlayer'
import { useLayout } from '@/providers/layout'

export default function AudioPlayerContainer() {
  const { showAudioPlayer, setShowAudioPlayer } = useLayout()

  return (
    <div className="fixed bottom-0 w-full">
      <div
        className={`transform transition-all duration-300 ease-in-out overflow-visible ${showAudioPlayer ? 'h-[113px]' : 'h-0'}`}
      >
        <AudioPlayer onDismiss={() => setShowAudioPlayer(false)} />
      </div>
    </div>
  )
}
