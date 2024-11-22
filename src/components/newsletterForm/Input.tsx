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
          'w-2/3 border border-gray-400 bg-gray-100 p-2 rounded-md',
          'ring-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500',
        )}
      />
    </div>
  )
}
