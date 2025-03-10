import clsx from 'clsx'

export default function Spinner({
  colour = 'text-blue-600 dark:text-blue-400',
  classes,
}: {
  colour?: string
  classes?: string
}) {
  return (
    <svg
      className={clsx('h-7 w-7', colour, classes)}
      style={{
        animation: 'spin 1.8s cubic-bezier(0.8, 0.2, 0.2, 0.8) infinite',
      }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}
