'use client'

import dynamic from 'next/dynamic'

const LiensGrid = dynamic(() => import('@/views/liens/LiensGrid'), {
  ssr: false,
})

export default function LiensPage() {
  return <LiensGrid />
}
