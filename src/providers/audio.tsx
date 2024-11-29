'use client'

import { createContext, useContext, useMemo, useReducer, useRef } from 'react'

export interface Song {
  title: string
  slug: string
}

interface PlayerState {
  playing: boolean
  duration: number
  currentTime: number
  song: Song | null
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
}

type Action =
  | { type: ActionKind.SET_META; payload: Song }
  | { type: ActionKind.PLAY }
  | { type: ActionKind.PAUSE }
  | { type: ActionKind.SET_CURRENT_TIME; payload: number }
  | { type: ActionKind.SET_DURATION; payload: number }

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
  }
}

function getAudioPath(slug: string) {
  return `/audio/${slug}.mp3`
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(audioReducer, {
    playing: false,
    duration: 0,
    currentTime: 0,
    song: null,
  })
  const playerRef = useRef<React.ElementRef<'audio'>>(null)

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
            }
          }
        }

        if (playerRef.current) {
          void playerRef.current.play()
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
          dispatch({
            type: ActionKind.SET_CURRENT_TIME,
            payload: Math.floor(event.currentTarget.currentTime),
          })
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
