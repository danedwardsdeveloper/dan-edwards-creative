import React from 'react'

import SongPreviews from './SongPreviews'

export default function SongsPage() {
  return (
    <SimpleLayout title="Songs" intro="All the songs I've helped to create, in one way or another.">
      <SongPlayButton
        className="group relative flex h-18 w-18 flex-shrink-0 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-4"
        playing={<PauseIcon className="h-9 w-9 fill-white group-active:fill-white/80" />}
        paused={<PlayIcon className="h-9 w-9 fill-white group-active:fill-white/80" />}
      />
      <div className="flex flex-row space-x-4 flex-wrap w-full bg-blue-50">
        <SongPreviews />
      </div>
    </SimpleLayout>
  )
}
