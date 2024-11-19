import { SimpleLayout } from '@/components/SimpleLayout'

export default function WorkWithMePage() {
  return (
    <SimpleLayout title="Work with me" intro="Work with me">
      {Array.from({ length: 5 }).map((_, i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis quas voluptatem quisquam
          blanditiis repellat maiores voluptatum, neque asperiores quidem eveniet quam cum, numquam magni
          expedita dolorum iure earum maxime inventore.
        </p>
      ))}{' '}
    </SimpleLayout>
  )
}
