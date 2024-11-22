'use client'

import clsx from 'clsx'

import AudioPlayerContainer from '@/components/audioPlayerContainer/index'

import { Footer } from './Footer'
import MenuBars from './menuBars'
import { useLayout } from '@/providers/layout'

interface Props {
  children: React.ReactNode
}

export default function MainContainer({ children }: Props) {
  const { showAudioPlayer } = useLayout()

  return (
    <div id="sliding-container" className="w-full transition-transform duration-500 ">
      <MenuBars />
      <div
        className={clsx(
          'flex flex-col pt-20 md:pt-0 overflow-y-auto transition-all duration-300',
          'md:mx-8 lg:mx-16',
          'bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20',
          showAudioPlayer ? 'mb-96' : 'mb-32',
        )}
        style={{
          height: showAudioPlayer ? 'calc(100vh - 116px)' : '100vh',
        }}
      >
        <main role="main" className="flex flex-1 flex-col mx-auto max-w-2xl md:mt-20">
          {children}
        </main>
        <Footer />
      </div>
      <AudioPlayerContainer />
    </div>
  )
}
