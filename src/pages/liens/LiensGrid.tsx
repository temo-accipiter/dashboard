'use client'

import { useState, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core'
import { useDroppable, useDraggable } from '@dnd-kit/core'
import IconCard from '@/components/iconCard/IconCard'

import SocialNetworkLogo from '@/assets/icons/social-network.svg'
import ToolsLogo from '@/assets/icons/tools.svg'

// Réseaux sociaux
import FacebookLogo from '@/assets/icons/facebook.svg'
import XLogo from '@/assets/icons/x.svg'
import LinkedinLogo from '@/assets/icons/linkedin.svg'
import RedditLogo from '@/assets/icons/reddit.svg'
import TelegramLogo from '@/assets/icons/telegram.svg'
import DiscordLogo from '@/assets/icons/discord.svg'
import MediumLogo from '@/assets/icons/medium.svg'
import GithubLogo from '@/assets/icons/github.svg'
import GmailLogo from '@/assets/icons/gmail.svg'
import SlackLogo from '@/assets/icons/slack.svg'

// Services
import NotionLogo from '@/assets/icons/notion.svg'
import FigmaLogo from '@/assets/icons/figma.svg'
import ClickupLogo from '@/assets/icons/clickup.svg'
import TodoistLogo from '@/assets/icons/todoist.svg'
import AirtableLogo from '@/assets/icons/airtable.svg'
import PocketLogo from '@/assets/icons/pocket.svg'
import MiroLogo from '@/assets/icons/miro.svg'
import GDriveLogo from '@/assets/icons/gdrive.svg'
import OneDriveLogo from '@/assets/icons/onedrive.svg'
import YoutubeLogo from '@/assets/icons/youtube.svg'

import { ReactNode } from 'react'
import './LiensGrid.scss'

interface CardInfo {
  id: string
  label: string
  icon: string
  href: string
}

const allCards: Record<string, CardInfo> = {
  airtable: {
    id: 'airtable',
    label: 'Airtable',
    icon: AirtableLogo.src,
    href: 'https://airtable.com',
  },
  clickup: {
    id: 'clickup',
    label: 'Clickup',
    icon: ClickupLogo.src,
    href: 'https://clickup.com',
  },
  discord: {
    id: 'discord',
    label: 'Discord',
    icon: DiscordLogo.src,
    href: 'https://discord.com/channels/@me',
  },
  figma: {
    id: 'figma',
    label: 'Figma',
    icon: FigmaLogo.src,
    href: 'https://figma.com',
  },
  facebook: {
    id: 'facebook',
    label: 'Facebook',
    icon: FacebookLogo.src,
    href: 'https://facebook.com',
  },
  gdrive: {
    id: 'gdrive',
    label: 'Google-drive',
    icon: GDriveLogo.src,
    href: 'https://drive.google.com/',
  },
  github: {
    id: 'github',
    label: 'Github',
    icon: GithubLogo.src,
    href: 'https://github.com',
  },
  gmail: {
    id: 'gmail',
    label: 'Gmail',
    icon: GmailLogo.src,
    href: 'https://gmail.com',
  },
  linkedin: {
    id: 'linkedin',
    label: 'Linkedin',
    icon: LinkedinLogo.src,
    href: 'https://linkedin.com',
  },
  medium: {
    id: 'medium',
    label: 'Medium',
    icon: MediumLogo.src,
    href: 'https://medium.com',
  },
  miro: {
    id: 'miro',
    label: 'Miro',
    icon: MiroLogo.src,
    href: 'https://miro.com',
  },
  notion: {
    id: 'notion',
    label: 'Notion',
    icon: NotionLogo.src,
    href: 'https://notion.so',
  },
  onedrive: {
    id: 'onedrive',
    label: 'Onedrive',
    icon: OneDriveLogo.src,
    href: 'https://onedrive.com',
  },
  pocket: {
    id: 'pocket',
    label: 'Pocket',
    icon: PocketLogo.src,
    href: 'https://pocket.com',
  },
  reddit: {
    id: 'reddit',
    label: 'Reddit',
    icon: RedditLogo.src,
    href: 'https://reddit.com',
  },
  slack: {
    id: 'slack',
    label: 'Slack',
    icon: SlackLogo.src,
    href: 'https://slack.com',
  },
  telegram: {
    id: 'telegram',
    label: 'Telegram',
    icon: TelegramLogo.src,
    href: 'https://telegram.com',
  },
  todoist: {
    id: 'todoist',
    label: 'Todoist',
    icon: TodoistLogo.src,
    href: 'https://todoist.com',
  },
  x: {
    id: 'x',
    label: 'X',
    icon: XLogo.src,
    href: 'https://x.com',
  },
  youtube: {
    id: 'youtube',
    label: 'YouTube',
    icon: YoutubeLogo.src,
    href: 'https://youtube.com',
  },
}

const generateSlots = (count: number, prefix: string) =>
  Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`)

type LayoutSection = Record<string, string | null>

interface Layout {
  social: LayoutSection
  services: LayoutSection
}

const initialLayout: Layout = {
  social: {
    social1: 'gmail',
    social2: 'youtube',
    social3: 'slack',
    social4: 'facebook',
    social5: 'x',
    social6: 'linkedin',
    social7: 'github',
    social8: 'reddit',
    social9: 'medium',
    social10: 'telegram',
    social11: 'discord',
    social12: null,
  },
  services: {
    services1: 'notion',
    services2: 'figma',
    services3: 'miro',
    services4: 'clickup',
    services5: 'todoist',
    services6: 'airtable',
    services7: 'pocket',
    services8: 'onedrive',
    services9: 'gdrive',
    services10: null,
    services11: null,
    services12: null,
  },
}

export default function LiensGrid() {
  const [layout, setLayout] = useState<Layout>(initialLayout)
  const [isMounted, setIsMounted] = useState(false)
  const sensors = useSensors(useSensor(PointerSensor))

  // Éviter l'hydration mismatch avec dnd-kit
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleDragEnd = (event: any, section: keyof Layout) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const currentSection = layout[section]
    const fromSlot = Object.keys(currentSection).find(
      (key) => currentSection[key] === active.id
    )
    const toSlot = over.id as string

    if (!fromSlot) return

    setLayout((prev) => {
      const updated = { ...prev }
      updated[section] = {
        ...updated[section],
        [fromSlot]: null,
        [toSlot]: active.id as string,
      }
      return updated
    })
  }

  const renderGrid = (section: keyof Layout, slots: string[]) => {
    const gridContent = (
      <div className="grid">
        {slots.map((slotId) => {
          const cardId = layout[section][slotId]
          const card = cardId ? allCards[cardId] : null
          return (
            <DroppableSlot key={slotId} id={slotId}>
              {card && (
                <DraggableCard
                  id={card.id}
                  icon={card.icon}
                  label={card.label}
                  href={card.href}
                />
              )}
            </DroppableSlot>
          )
        })}
      </div>
    )

    // Ne wrap avec DndContext que si monté côté client (évite hydration mismatch)
    if (!isMounted) {
      return gridContent
    }

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(e) => handleDragEnd(e, section)}
      >
        {gridContent}
      </DndContext>
    )
  }

  return (
    <section className="liens-grid-two">
      <div className="section social-section">
        <h2>
          {' '}
          <img
            src={SocialNetworkLogo.src}
            alt="Réseaux sociaux"
            className="icon-title"
          />{' '}
          Réseaux sociaux{' '}
        </h2>
        {renderGrid('social', generateSlots(12, 'social'))}
      </div>

      <div className="separator" />

      <div className="section services-section">
        <h2>
          {' '}
          <img
            src={ToolsLogo.src}
            alt="Services & Outils"
            className="icon-title"
          />{' '}
          Services & Outils{' '}
        </h2>
        {renderGrid('services', generateSlots(12, 'services'))}
      </div>
    </section>
  )
}

interface DraggableCardProps {
  id: string
  icon: string
  label: string
  href: string
}

function DraggableCard({ id, icon, label, href }: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id })
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    touchAction: 'manipulation' as const,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <IconCard icon={icon} label={label} href={href} />
    </div>
  )
}

interface DroppableSlotProps {
  id: string
  children?: ReactNode
}

function DroppableSlot({ id, children }: DroppableSlotProps) {
  const { setNodeRef, isOver } = useDroppable({ id })
  return (
    <div ref={setNodeRef} className={`slot${isOver ? ' over' : ''}`}>
      {children}
    </div>
  )
}
