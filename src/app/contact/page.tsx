import ObfuscatedEmail from '../privacy-policy-and-terms-of-service/components/ObfuscatedEmail'
import { SimpleLayout } from '@/components/SimpleLayout'

export default function ContactPage() {
  return (
    <SimpleLayout
      title="Contact"
      intro={`If you'd like to work with me or have a question, I'd love to hear from you.`}
    >
      <ObfuscatedEmail />
    </SimpleLayout>
  )
}
