'use client'

import { createContext, useContext, useMemo, useReducer, useRef, useState } from 'react'

import logger from '@/library/logger'

import { Song } from '@/app/songs/data'
import { useRecordLinkClick } from '@/hooks/useRecordLinkClick'

interface PlayerState {
  playing: boolean
  duration: number
  currentTime: number
  song: Song | null
  lastRecordedPlay: string | null
}

interface PublicPlayerActions {
  play: (song?: Song) => void
  pause: () => void
  togglePlaying: (song?: Song) => void
  seekBy: (amount: number) => void
  seek: (time: number) => void
  isPlaying: (song?: Song) => boolean
}

export type PlayerAPI = PlayerState & PublicPlayerActions

const enum ActionKind {
  SET_META = 'SET_META',
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  SET_CURRENT_TIME = 'SET_CURRENT_TIME',
  SET_DURATION = 'SET_DURATION',
  RESET_RECORDED_PLAY = 'RESET_RECORDED_PLAY',
  SET_RECORDED_PLAY = 'SET_RECORDED_PLAY',
}

type Action =
  | { type: ActionKind.SET_META; payload: Song }
  | { type: ActionKind.PLAY }
  | { type: ActionKind.PAUSE }
  | { type: ActionKind.SET_CURRENT_TIME; payload: number }
  | { type: ActionKind.SET_DURATION; payload: number }
  | { type: ActionKind.RESET_RECORDED_PLAY }
  | { type: ActionKind.SET_RECORDED_PLAY; payload: string }

const AudioPlayerContext = createContext<PlayerAPI | null>(null)

function audioReducer(state: PlayerState, action: Action): PlayerState {
  switch (action.type) {
    case ActionKind.SET_META:
      return { ...state, song: action.payload }
    case ActionKind.PLAY:
      return { ...state, playing: true }
    case ActionKind.PAUSE:
      return { ...state, playing: false }
    case ActionKind.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload }
    case ActionKind.SET_DURATION:
      return { ...state, duration: action.payload }
    case ActionKind.RESET_RECORDED_PLAY:
      return { ...state, lastRecordedPlay: null }
    case ActionKind.SET_RECORDED_PLAY:
      return { ...state, lastRecordedPlay: action.payload }
  }
}

function getAudioPath(slug: string) {
  return `/audio/${slug}.mp3`
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const recordPlay = useRecordLinkClick()
  const [hasTriggeredPlay, setHasTriggeredPlay] = useState(false)

  const [state, dispatch] = useReducer(audioReducer, {
    playing: false,
    duration: 0,
    currentTime: 0,
    song: null,
    lastRecordedPlay: null,
  })
  const playerRef = useRef<HTMLAudioElement>(null)

  const actions = useMemo<PublicPlayerActions>(
    () => ({
      play(song) {
        if (song) {
          dispatch({ type: ActionKind.SET_META, payload: song })

          if (playerRef.current) {
            const currentSlug = playerRef.current.currentSrc.split('/').pop()?.replace('.mp3', '')
            if (currentSlug !== song.slug) {
              playerRef.current.src = getAudioPath(song.slug)
              playerRef.current.load()
              playerRef.current.pause()
              playerRef.current.currentTime = 0
              dispatch({ type: ActionKind.RESET_RECORDED_PLAY })
              setHasTriggeredPlay(false)
            }

            void playerRef.current.play().catch(error => {
              logger.error('Error playing audio', error)
            })
          }
        }
      },
      pause() {
        if (playerRef.current) {
          void playerRef.current.pause()
        }
      },
      togglePlaying(song) {
        if (this.isPlaying(song)) {
          this.pause()
        } else {
          this.play(song)
        }
      },
      seekBy(amount) {
        if (playerRef.current) {
          playerRef.current.currentTime += amount
        }
      },
      seek(time) {
        if (playerRef.current) {
          playerRef.current.currentTime = time
        }
      },
      isPlaying(song) {
        if (!playerRef.current) return false
        return song
          ? state.playing &&
              playerRef.current.currentSrc === new URL(getAudioPath(song.slug), window.location.href).href
          : state.playing
      },
    }),
    [state.playing],
  )

  const api = useMemo<PlayerAPI>(() => ({ ...state, ...actions }), [state, actions])
  return (
    <>
      <AudioPlayerContext.Provider value={api}>{children}</AudioPlayerContext.Provider>
      <audio
        ref={playerRef}
        onPlay={() => dispatch({ type: ActionKind.PLAY })}
        onPause={() => dispatch({ type: ActionKind.PAUSE })}
        onTimeUpdate={event => {
          const currentTime = Math.floor(event.currentTarget.currentTime)

          dispatch({
            type: ActionKind.SET_CURRENT_TIME,
            payload: currentTime,
          })

          if (
            currentTime >= 5 &&
            !hasTriggeredPlay &&
            state.song &&
            state.lastRecordedPlay !== state.song.slug
          ) {
            logger.debug('Song play triggered by audio provider', {
              currentTime,
              songSlug: state.song.slug,
              lastRecordedPlay: state.lastRecordedPlay,
            })
            recordPlay('chewing-gum-audio-play')
            dispatch({ type: ActionKind.SET_RECORDED_PLAY, payload: state.song.slug })
            setHasTriggeredPlay(true)
          }
        }}
        onDurationChange={event => {
          dispatch({
            type: ActionKind.SET_DURATION,
            payload: Math.floor(event.currentTarget.duration),
          })
        }}
      />
    </>
  )
}

export function useAudioPlayer(song?: Song) {
  const player = useContext(AudioPlayerContext)

  return {
    ...player!,
    play() {
      player!.play(song)
    },
    togglePlaying() {
      player!.togglePlaying(song)
    },
    get playing() {
      return player!.isPlaying(song)
    },
  }
}
