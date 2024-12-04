import clsx from 'clsx'
import Image from 'next/image'
import { ReactNode } from 'react'

const baseContainerStyles = `w-full`
const marginStyles = 'mt-10 mb-4'
const baseImageStyles = `rounded-lg w-full h-auto`
const borderStyles = 'border border-zinc-200 dark:border-zinc-700 rounded-lg'
const captionStyles = 'mt-2 mb-6 text-gray-600 italic text-sm'

interface Props {
  src: string
  alt: string
  height: number
  width: number
  sizes?: string
  caption?: string
  children?: ReactNode
  border?: boolean
  classes?: string
  margin?: boolean
  priority?: boolean
}

export const FeaturedImage = ({ src, alt, sizes, border }: Props) => {
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

export const AdditionalImage = ({
  src,
  alt,
  height,
  width,
  sizes,
  caption,
  children,
  classes,
  border,
  margin = true,
  priority,
}: Props) => {
  return (
    <>
      <div className={clsx(baseContainerStyles, margin && marginStyles)}>
        <Image
          src={src}
          alt={alt}
          height={height}
          width={width}
          sizes={sizes}
          priority={priority}
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
