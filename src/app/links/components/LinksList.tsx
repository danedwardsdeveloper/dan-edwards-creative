'use client'

import clsx from 'clsx'
import React from 'react'

import LinkCard, { LinkItemInterface } from './LinkCard'

interface ArticlesListProps {
  linkItems: LinkItemInterface[]
  classes?: string
}

export default function LinksList({ linkItems, classes }: ArticlesListProps) {
  // const linkCardRef = useRef<(HTMLLIElement | null)[]>([])
  // const [isClient, setIsClient] = useState(false)

  // useEffect(() => {
  //   setIsClient(true)
  // }, [])

  // useEffect(() => {
  //   if (!isClient) return

  //   let ctx: gsap.Context

  //   const setupAnimations = () => {
  //     if (typeof window === 'undefined') return

  //     gsap.registerPlugin(ScrollTrigger)

  //     ctx = gsap.context(() => {
  //       linkCardRef.current.forEach((article, index) => {
  //         if (article) {
  //           gsap.fromTo(
  //             article,
  //             {
  //               opacity: 0,
  //               y: 50,
  //             },
  //             {
  //               opacity: 1,
  //               y: 0,
  //               duration: 3,
  //               ease: 'power3.out',
  //               scrollTrigger: {
  //                 trigger: article,
  //                 start: 'top bottom-=20%',
  //                 end: 'top center',
  //                 toggleActions: 'play none none none',
  //                 // markers: true,
  //               },
  //               delay: index * 0.1,
  //             },
  //           )
  //         }
  //       })
  //     })
  //   }

  //   requestAnimationFrame(() => {
  //     requestAnimationFrame(setupAnimations)
  //   })

  //   return () => {
  //     if (ctx) ctx.revert()
  //   }
  // }, [isClient, linkItems])

  // const setItemRef = (element: HTMLLIElement | null, index: number) => {
  //   linkCardRef.current[index] = element
  // }

  return (
    <ul role="list" className={clsx('flex flex-col space-y-3 list-none', classes)}>
      {linkItems.map(
        (
          linkItem,
          // , index
        ) => (
          <li
            key={linkItem.href}
            // ref={element => setItemRef(element, index + 1)}
          >
            <LinkCard linkCard={linkItem} />
          </li>
        ),
      )}
    </ul>
  )
}
