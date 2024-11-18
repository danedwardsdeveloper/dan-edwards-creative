interface HeaderProps {
  title: string
  subtitle: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex flex-col">
      <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
        {title}
      </h1>
      <span className="flex items-center text-base text-zinc-600 dark:text-zinc-400">
        {subtitle}
      </span>
    </header>
  )
}
