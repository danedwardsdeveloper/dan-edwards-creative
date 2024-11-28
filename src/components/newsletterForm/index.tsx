import clsx from 'clsx'
import { ReactNode, useState } from 'react'

import { typesafeFetch } from '@/library/typesafeFetch'

import { Button } from '../Button'
import Spinner from '../Spinner'
import StyledLink from '../StyledLink'
import Input from './Input'
import { ApiEndpoints } from '@/types/apiEndpoints'

type MessageStatus = Exclude<
  ApiEndpoints['/api/subscriptions/add']['POST']['data']['message'],
  'email required' | 'first name required'
>

export function NewsletterForm() {
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<MessageStatus>('default')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubscribing(true)

    try {
      const response = await typesafeFetch({
        path: '/api/subscriptions/add',
        method: 'POST',
        body: { email: email.trim(), firstName: firstName.trim() },
      })

      switch (response.message) {
        case 'success please confirm':
          setStatus('success please confirm')
          break
        case 'already pending':
          setStatus('already pending')
          break
        case 'already confirmed':
          setStatus('already confirmed')
          break
        default:
          throw new Error('Subscription failed')
      }
    } catch {
      setStatus('fail')
    } finally {
      setIsSubscribing(false)
    }
  }

  const formIsVisible = status === 'default' || status === 'fail'

  const greenText = 'text-green-600 dark:text-green-400'

  interface MessageConfig {
    heading: string
    text: string | ReactNode
    colour: string
  }

  const messageConfigs: Record<MessageStatus, MessageConfig> = {
    default: {
      heading: 'Join my mailing list',
      text: 'I agree to receive emails. Unsubscribe with one click anytime.',
      colour: 'text-slate-600 dark:text-slate-400',
    },
    'success please confirm': {
      heading: `Thank you${firstName ? `, ${firstName}` : ''}`,
      text: email
        ? `Please click the link in the email sent to ${email} to confirm your subscription. Remember to check your junk folder.`
        : 'Please click the link in your email to confirm your subscription. Remember to check your junk folder.',
      colour: greenText,
    },
    'success confirmation bypassed': {
      heading: `Thank you${firstName ? `, ${firstName}` : ''}`,
      text: `${email ? email : `You're `} successfully subscribed to my newsletter.`,
      colour: greenText,
    },
    'already confirmed': {
      heading: `Thank you${firstName ? `, ${firstName}` : ''}`,
      text: `${email ? email : `You're `} already subscribed successfully.`,
      colour: greenText,
    },
    'already pending': {
      heading: 'Awaiting confirmation',
      text: `Please click the link in the confirmation email${email ? ` sent to ${email}` : ''}, which may be in your junk folder.`,
      colour: 'text-orange-600 dark:text-orange-400',
    },
    fail: {
      heading: 'Sorry, something went wrong',
      text: (
        <>
          Please try again or <StyledLink href="/contact" text="contact me" colour="red" /> directly.
        </>
      ),
      colour: 'text-red-600 dark:text-red-400',
    },
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4 border border-gray-200 rounded-xl p-4">
      <h2 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-100">
        {messageConfigs[status].heading}
      </h2>
      <p className={clsx(messageConfigs[status].colour)}>{messageConfigs[status].text}</p>
      <Input
        label="First name"
        id="firstName"
        name="firstName"
        type="text"
        value={firstName}
        dataTestID="newsletter-name"
        autoComplete="given-name"
        ariaHidden={!formIsVisible}
        onChange={event => setFirstName(event.target.value.trim())}
        classes={clsx('transition-all duration-300', { 'opacity-0': !formIsVisible })}
      />
      <Input
        label="Email"
        id="email"
        name="email"
        type="email"
        value={email}
        dataTestID="newsletter-email"
        ariaHidden={!formIsVisible}
        autoComplete="email"
        onChange={event => setEmail(event.target.value.trim())}
        classes={clsx('transition-all duration-300', { 'opacity-0': !formIsVisible })}
      />

      <Button
        type="submit"
        disabled={isSubscribing || !formIsVisible}
        aria-hidden={!formIsVisible}
        className={clsx('transition-all duration-300', { 'opacity-0': !formIsVisible })}
      >
        {isSubscribing ? <Spinner colour="text-white" /> : 'Subscribe'}
      </Button>
    </form>
  )
}
