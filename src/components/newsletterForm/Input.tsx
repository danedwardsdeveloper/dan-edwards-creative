import clsx from 'clsx'

interface Props {
  label: string
  id: string
  name: string
  type: string
  value: string
  dataTestID: string
  ariaHidden?: boolean
  autoComplete: 'given-name' | 'email'
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  classes?: string
}

export default function Input({
  label,
  id,
  name,
  type,
  value,
  dataTestID,
  ariaHidden,
  autoComplete,
  onChange,
  placeholder,
  classes,
}: Props) {
  return (
    <div className={clsx('flex items-center justify-between', classes)}>
      <label htmlFor={id} className="w-1/3">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        required
        value={value}
        aria-hidden={ariaHidden}
        autoComplete={autoComplete}
        onChange={onChange}
        placeholder={placeholder}
        data-testid={dataTestID}
        className={clsx(
          'w-2/3 border p-2 rounded-md',
          ' bg-slate-100 dark:bg-slate-800 border-slate-400 dark:border-slate-600',
          'outline-offset-4 focus:outline-none focus:outline-2 focus:outline-blue-500',
        )}
      />
    </div>
  )
}
