'use client'

import { ReactNode } from 'react'
import '@/i18n/i18n'
import LayoutComponent from '@/components/layout/LayoutComponent'

export function Providers({ children }: { children: ReactNode }) {
  return <LayoutComponent>{children}</LayoutComponent>
}
