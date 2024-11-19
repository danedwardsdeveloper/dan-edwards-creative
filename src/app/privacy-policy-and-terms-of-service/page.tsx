import ObfuscatedEmail from './components/ObfuscatedEmail'
import { Container } from '@/components/Container'
import { SimpleLayout } from '@/components/SimpleLayout'

export default function PrivacyPolicyPage() {
  return (
    <Container>
      <SimpleLayout title={'Privacy policy & terms of service'} intro={'Updated: November 6, 2024'}>
        <h2>Privacy Policy</h2>
        <p>
          {`Dan Edwards Creative ("we," "our," or "us") respects your privacy and
          is committed to protecting any data that we interact with through our
          Spotify integration. This privacy policy explains our practices
          regarding your data when you use our website.`}
        </p>

        <h3>Data Collection and Use</h3>
        <p>When you use our Spotify pre-save feature:</p>
        <ul>
          <li>We only request authorization to add music to your Spotify library</li>
          <li>We do not store any personal information</li>
          <li>We do not track, collect, or maintain any data about your Spotify account or usage</li>
          <li>
            {`The authorization process is handled directly through Spotify's
            secure authentication system`}
          </li>
          <li>Once a pre-save is completed, we retain no access to your account</li>
        </ul>

        <h3>Third-Party Services</h3>
        <p>
          {`Our website integrates with Spotify's services. When you interact with
          Spotify features on our site:`}
        </p>
        <ul>
          <li>{`You will be directed to Spotify's authorization page`}</li>
          <li>Any authentication is handled directly by Spotify</li>
          <li>
            {`Spotify's privacy policy applies to your interaction with their
            services`}
          </li>
        </ul>

        <h3>Data Security</h3>
        <p>
          {`While we don't collect or store personal data, we maintain secure
          connections when interfacing with Spotify's services to ensure the
          security of your authorization process.`}
        </p>

        <h3>Changes to This Policy</h3>
        <p>
          We may update this privacy policy from time to time. We will notify users of any material changes by
          posting the new privacy policy on this page.
        </p>

        <h3>Contact Us</h3>
        <p>
          If you have any questions about this privacy policy, please contact us at [Your Contact
          Information].
        </p>

        <h2>Terms of Service</h2>

        <h3>1. Acceptance of Terms</h3>
        <p>
          {`By accessing and using Dan Edwards Creative's website, you accept and
          agree to be bound by these Terms of Service.`}
        </p>

        <h3>2. Service Description</h3>
        <p>Our service provides:</p>
        <ul>
          <li>Spotify pre-save functionality for upcoming music releases</li>
          <li>Music previews and information about releases</li>
          <li>Other music-related content and features</li>
        </ul>

        <h3>3. Spotify Integration</h3>
        <p>When using our Spotify-integrated features:</p>
        <ul>
          <li>You must have a valid Spotify account</li>
          <li>You agree to authorize our app with the minimum necessary permissions</li>
          <li>
            {`You acknowledge that any interaction with Spotify's services is also
            subject to Spotify's terms of service`}
          </li>
        </ul>

        <h3>4. User Conduct</h3>
        <p>You agree not to:</p>
        <ul>
          <li>Use the service for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access to any portion of the service</li>
          <li>Interfere with or disrupt the service or servers</li>
          <li>Circumvent any security features</li>
        </ul>

        <h3>5. Intellectual Property</h3>
        <p>
          All content on this website, including but not limited to music, text, graphics, logos, and images,
          is the property of Dan Edwards Creative or its content creators and protected by applicable
          copyright laws.
        </p>

        <h3>6. Disclaimer of Warranties</h3>
        <p>
          {`The service is provided "as is" without any warranties, expressed or
          implied. We do not guarantee uninterrupted or error-free service.`}
        </p>

        <h3>7. Limitation of Liability</h3>
        <p>
          Dan Edwards Creative shall not be liable for any indirect, incidental, special, consequential, or
          punitive damages resulting from your use or inability to use the service.
        </p>

        <h3>8. Changes to Terms</h3>
        <p>
          We reserve the right to modify these terms at any time. Continued use of the service after any
          changes constitutes acceptance of the new terms.
        </p>

        <h3>9. Governing Law</h3>
        <p>
          These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction].
        </p>

        <h3>10. Contact Information</h3>
        <p>For any questions regarding these terms, please contact Dan using the email below:</p>
        <ObfuscatedEmail />
      </SimpleLayout>
    </Container>
  )
}
