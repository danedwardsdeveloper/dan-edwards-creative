export default function TwoColumnLayout({
  columnOne,
  columnTwo,
}: {
  columnOne?: React.ReactNode
  columnTwo?: React.ReactNode
}) {
  return (
    <div data-component="TwoColumnLayout">
      <div className="grid grid-cols-1 gap-x-20 lg:grid-cols-[1fr_400px] gap-y-28 lg:px-8">
        <div>{columnOne}</div>
        <div className="mx-auto">{columnTwo}</div>
      </div>
    </div>
  )
}
