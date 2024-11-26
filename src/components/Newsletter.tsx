'use client'

import clsx from 'clsx'
import { ChangeEvent, FormEvent, useState } from 'react'

import { subscribeToNewsletter } from '@/library/mailchimpNewsletter'

import { Button } from '@/components/Button'

import { MailIcon } from './Icons'
import Spinner from './Spinner'

interface FormData {
  email: string
  name: string
}

const inputStyles = clsx(
  'min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10',
  'bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5',
  'placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10',
  'sm:text-sm',
  'dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500',
  'dark:focus:border-teal-400 dark:focus:ring-teal-400/10',
)

export default function Newsletter() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
  })
  const [message, setMessage] = useState({
    text: '',
    type: 'info' as 'info' | 'success' | 'error',
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await subscribeToNewsletter(formData.email, formData.name)

      if (response.includes('already subscribed')) {
        setMessage({
          text: response,
          type: 'error',
        })
      } else {
        setMessage({
          text: response,
          type: 'success',
        })
        setFormData({ email: '', name: '' })
      }
    } catch (error) {
      setMessage({
        text: error instanceof Error ? error.message : 'An unknown error occurred',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      id="newsletter-form"
      data-testid="homepage-newsletter-form"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p
        className={clsx('mt-2 text-sm', {
          'text-red-600 dark:text-red-400': message.type === 'error',
          'text-green-600 dark:text-green-400': message.type === 'success',
          'text-zinc-600 dark:text-zinc-400': message.type === 'info',
        })}
        data-testid="homepage-newsletter-message"
      >
        {message.text || 'Sign up to my newsletter'}
      </p>
      <div className="mt-6 flex">
        <input
          data-testid="homepage-newsletter-email-input"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email address"
          aria-label="Email address"
          value={formData.email}
          onChange={handleInputChange}
          required
          className={inputStyles}
        />
      </div>
      <div className="mt-6 flex">
        <input
          data-testid="homepage-newsletter-name-input"
          type="name"
          name="name"
          autoComplete="name"
          placeholder="Name"
          aria-label="Name"
          required
          value={formData.name}
          onChange={handleInputChange}
          className={inputStyles}
        />
        <Button
          type="submit"
          className="ml-4 flex-none"
          data-testid="homepage-newsletter-submit-button"
          variant="primary"
        >
          {isLoading ? <Spinner /> : 'Join'}
        </Button>
      </div>
    </form>
  )
}
