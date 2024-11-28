import { SimpleLayout } from '@/components/SimpleLayout'
import StyledLink from '@/components/StyledLink'

export default function WorkWithMePage() {
  return (
    <SimpleLayout
      title="Work with me"
      intro="While my web development career currently takes priority over production work, I'm actively seeking songwriting collaborations."
    >
      <p>{`I'm a classically trained prize-winning composer with a talent for crafting catchy melodies. I enjoy writing lyrics, too, but music theory is my deepest area of expertise, so I especially enjoy working with people who can craft a clever lyric.`}</p>
      <p>{`I'm particularly interested in working with songwriters or artists who:`}</p>
      <ul>
        <li>{`Have already released music`}</li>
        <li>{`Can contribute towards professional production, mixing and mastering`}</li>
        <li>{`Have a solid promotional strategy in place`}</li>
      </ul>
      <h2>{`Style`}</h2>
      <p>{`My songwriting sweet spots are:`}</p>
      <ul>
        <li>{`High-energy commercial pop with infectious hooks and memorable melodies`}</li>
        <li>{`Emotional power ballads in the vein of Lewis Capaldi, Adele, and iconic Disney songs`}</li>
      </ul>
      <h2>{`Available Songs`}</h2>
      <p>{`I have three songs to release in 2025, each with strong melodic foundations. While I have potential recording plans for 2025, I'm open to discussing these tracks with committed artists who are ready to develop and release them. The songs have partial lyrics and are unproduced, so there's plenty of room for collaborative input.`}</p>
      <ul>
        <li>
          <strong>{`An uptempo pop bop with an unforgettable melody`}</strong>
          <ul>
            <li>{`Suitable for any voice type`}</li>
            <li>{`Vocally challenging`}</li>
          </ul>
        </li>
        <li>
          <strong>{`A pop ballad for any voice type`}</strong>
        </li>
        <li>
          <strong>{`A unique EDM-pop fusion featuring the double harmonic scale`}</strong>
          <ul>
            <li>{`Suitable for a
      female/high-voice singer`}</li>
            <li>{`Would particularly suit an Arabic singer`}</li>
          </ul>
        </li>
      </ul>

      <p>{`I live in Salisbury but can work in London and Manchester, too.`}</p>

      <p>
        {`If you're serious about your music career and connect with my style, `}
        <StyledLink href="/contact">{`send me a message`}</StyledLink>
        {` and let's create something unique.`}
      </p>
    </SimpleLayout>
  )
}
