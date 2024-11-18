'use client'
import { ContainerInner, ContainerOuter } from '@/components/Container'
import { useAudioPlayer } from '@/providers/audio'
import clsx from 'clsx'
import Link from 'next/link'

export function Footer() {
  const player = useAudioPlayer()
  const hasAudio = player.episode !== null

  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div
          className={clsx(
            'border-t border-zinc-100 pt-10 dark:border-zinc-700/40',
            hasAudio ? 'pb-36' : 'pb-16',
          )}
        >
          <ContainerInner>
            <div className="flex flex-col items-center justify-end gap-6 sm:flex-row">
              <Link
                href={`/privacy-policy-and-terms-of-service`}
                className="text-sm text-zinc-500 decoration-transparent underline-offset-2 transition-all duration-300 hover:underline hover:decoration-zinc-500 dark:text-zinc-400 dark:decoration-zinc-400"
              >
                {`Privacy policy & terms of service`}
              </Link>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                &copy; {new Date().getFullYear()}, Dan Edwards
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
