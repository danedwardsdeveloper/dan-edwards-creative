import { ReactNode } from 'react'

export default function TwoColumnLayout({
  title,
  intro,
  columnOne,
  columnTwo,
}: {
  title: string
  intro: string | ReactNode
  columnOne?: ReactNode
  columnTwo?: ReactNode
}) {
  return (
    <div data-component="TwoColumnLayout" className="mt-12 mb-20">
      <div className="grid grid-cols-1 gap-x-20 lg:grid-cols-[1fr_400px] gap-y-28 lg:px-8">
        <div>
          <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight text-balance">
            {title}
          </h1>
          <p className="text-balance mt-6 text-base text-zinc-600 dark:text-zinc-400">{intro}</p>
          <div className="mt-16 md:mt-20">{columnOne}</div>
        </div>
        <div className="mx-auto">{columnTwo}</div>
      </div>
    </div>
  )
}
