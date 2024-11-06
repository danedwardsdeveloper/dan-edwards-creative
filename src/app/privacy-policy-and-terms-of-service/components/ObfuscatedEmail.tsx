'use client'
import { useState, useCallback } from 'react'
import clsx from 'clsx'
import { MailIcon } from '@/components/Icons'
import { useRecordLinkClick } from '@/hooks/useRecordLinkClick'

interface ObfuscatedEmailProps {
  className?: string
}

export default function ObfuscatedEmail({ className }: ObfuscatedEmailProps) {
  const recordClick = useRecordLinkClick()
  const encodedEmail = 'ZGFuZWR3YXJkc2NyZWF0aXZlQGdtYWlsLmNvbQ=='
  const [decodedEmail, setDecodedEmail] = useState('')
  const [copied, setCopied] = useState(false)

  const decodeEmail = useCallback(() => {
    if (!decodedEmail) {
      const decoded = atob(encodedEmail)
      setDecodedEmail(decoded)
    }
  }, [encodedEmail, decodedEmail])

  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    recordClick('copy-email-address')
    decodeEmail()
    navigator.clipboard.writeText(decodedEmail).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <li className={clsx(className, 'flex')}>
      <button
        onClick={handleClick}
        title="Copy Dan's email address to the clipboard"
        className="group flex"
      >
        <MailIcon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-blue-600 dark:group-hover:fill-blue-400" />
        <span
          className={clsx(
            'ml-4',
            'text-sm font-medium',
            'text-zinc-800 transition hover:text-blue-600 dark:text-zinc-200 dark:hover:text-blue-400',
            copied ? 'text-blue-600' : 'text-zinc-800 dark:text-zinc-200',
          )}
        >
          {copied ? 'Email copied ✅' : 'Copy email address'}
        </span>
      </button>
    </li>
  )
}
