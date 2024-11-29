interface HeaderProps {
  title: string
  intro: string | React.ReactNode
}

export function Header({ title, intro }: HeaderProps) {
  return (
    <header className="flex flex-col mt-12 mb-20 lg:px-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight text-balance">
        {title}
      </h1>
      <p className="text-balance mt-6 text-base text-zinc-600 dark:text-zinc-400">{intro}</p>
    </header>
  )
}
