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
    <>
      <MenuBars />
      <div
        className={clsx(
          'pt-20 md:pt-0 overflow-y-auto transition-all duration-300',
          'bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20',
          showAudioPlayer ? 'mb-96' : 'mb-32',
        )}
        style={{
          height: showAudioPlayer ? 'calc(100vh - 116px)' : '100vh',
        }}
      >
        <main role="main" className="flex flex-1 flex-col min-h-full mx-auto max-w-2xl mt-6 md:mt-12">
          {children}
        </main>
        <Footer />
      </div>
      <AudioPlayerContainer />
    </>
  )
}

{
  /* <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Header />
        <main className="flex-auto">{children}</main>
        <Footer />
      </div>
    </> */
}
