// interface EmailPhotoProps {
//   src: string
//   alt: string
//   width: number
//   height: number
//   className?: string
//   rounded?: boolean
//   border?: boolean
// }

// /* eslint-disable @next/next/no-img-element */
// export function EmailPhoto({
//   src,
//   alt,
//   width,
//   height,
//   className,
//   rounded = true,
//   border = false,
// }: EmailPhotoProps) {
//   const secureSrc = src.replace(/^http:/, 'https:')

//   return (
//     <img
//       src={secureSrc}
//       alt={alt}
//       width={width}
//       height={height}
//       className={className}
//       style={{
//         display: 'block',
//         maxWidth: '100%',
//         height: 'auto',
//         border: border ? `2px solid ${slate200}` : '',
//         outline: 'none',
//         margin: '0',
//         padding: '0',
//         borderRadius: rounded ? '8px' : '0',
//       }}
//     />
//   )
// }
