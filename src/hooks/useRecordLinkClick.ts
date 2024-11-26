// 'use client'

// import { usePathname } from 'next/navigation'
// import { useCallback } from 'react'

// // import { Destination } from '@/app/api/analytics/link-clicks/route'
// import { ApiEndpoints, ApiMethod, ApiPath } from '@/types/apiEndpoints'

// export function useRecordLinkClick() {
//   const currentPath = usePathname()

//   const recordClick = useCallback(
//     async (destination: Destination) => {
//       try {
//         const typesafePath: ApiPath<'/api/analytics/link-clicks'> = '/api/analytics/link-clicks'
//         const typesafeMethod: ApiMethod<'/api/analytics/link-clicks'> = 'POST'
//         const typesafeBody: ApiEndpoints['/api/analytics/link-clicks']['POST']['body'] = {
//           destination,
//           source: currentPath,
//         }

//         await fetch(typesafePath, {
//           method: typesafeMethod,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(typesafeBody),
//         })
//       } catch (error) {
//         console.error('Error logging link click:', error)
//       }
//     },
//     [currentPath],
//   )

//   return recordClick
// }
