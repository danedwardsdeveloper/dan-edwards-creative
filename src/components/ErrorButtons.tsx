import Button from './Button'

export function BackButton({ path }: { path: string | undefined }) {
  if (!path) {
    return null
  } else {
    return <Button href={path} variant="secondary" text={`Back to ${path}`} width="md:max-w-sm" />
  }
}

export default function ErrorButtons({ path }: { path: string | undefined }) {
  return (
    <div className="mt-4 flex flex-col space-y-4 w-full items-center">
      <BackButton path={path} />
      <Button href="/" variant="secondary" text="Home" width="md:max-w-sm" />
    </div>
  )
}
