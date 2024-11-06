import { ReactNode } from 'react'
import { Container } from './Container'

interface TwoColumnLayoutProps {
  title: string
  intro: string | ReactNode
  columnOne: ReactNode
  columnTwo: ReactNode
  socialLinks?: ReactNode
  additionalContent?: ReactNode
}

export default function TwoColumnLayout({
  title,
  intro,
  columnOne,
  columnTwo,
  socialLinks,
  additionalContent,
}: TwoColumnLayoutProps) {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {title}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {intro}
          </p>
          {socialLinks && <div className="mt-6 flex gap-6">{socialLinks}</div>}
        </div>
      </Container>
      {additionalContent && <div>{additionalContent}</div>}
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          {columnOne}
          <div className="space-y-10 lg:pl-16 xl:pl-24">{columnTwo}</div>
        </div>
      </Container>
    </>
  )
}
