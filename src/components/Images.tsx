import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import { ReactNode } from 'react'

const baseContainerStyles = `w-full`
const marginStyles = 'mt-10 mb-4'
const baseImageStyles = `rounded-lg w-full h-auto`
const borderStyles = 'border border-zinc-200 dark:border-zinc-700 rounded-lg'
const sizes = '(max-width: 1023px) calc(100vw - 2rem), min(calc(100vw - 2rem), 576px)'
const captionStyles = 'mt-2 mb-6 text-gray-600 italic text-sm'

interface Props {
  src: StaticImageData
  alt: string
  caption?: string
  children?: ReactNode
  border?: boolean
  classes?: string
  margin?: boolean
}

export const FeaturedImage = ({ src, alt, border }: Props) => {
  return (
    <div className={clsx('w-full', marginStyles)}>
      <Image
        src={src}
        alt={alt}
        height={627}
        width={352}
        priority
        sizes={sizes}
        placeholder="blur"
        className={clsx(baseImageStyles, border && borderStyles)}
      />
    </div>
  )
}

export const AdditionalImage = ({ src, alt, caption, children, classes, border, margin = true }: Props) => {
  return (
    <>
      <div className={clsx(baseContainerStyles, margin && marginStyles)}>
        <Image
          src={src}
          alt={alt}
          sizes={sizes}
          placeholder="blur"
          className={clsx(baseImageStyles, 'object-cover', classes, border && borderStyles)}
        />
      </div>
      {children ? (
        <div className={clsx(captionStyles)}>{children}</div>
      ) : caption ? (
        <p className={clsx(captionStyles)}>{caption}</p>
      ) : null}
    </>
  )
}
