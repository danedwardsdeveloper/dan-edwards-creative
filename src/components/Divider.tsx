import clsx from 'clsx'

interface Props {
  margin?: string
  ariaLabel?: string
}

export default function Divider({ margin = 'my-3', ariaLabel }: Props) {
  return (
    <hr
      aria-label={ariaLabel}
      className={clsx(
        ' w-full h-px border-0 bg-gradient-to-r from-violet-800/5 via-violet-800/20 to-violet-800/5',
        margin,
      )}
    />
  )
}
