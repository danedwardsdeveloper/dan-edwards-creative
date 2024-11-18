'use client'

import { useContext } from 'react'
import { LoadingContext } from '@/providers/loading'

export const useLoading = () => useContext(LoadingContext)
