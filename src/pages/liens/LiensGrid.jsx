import { useState } from 'react'
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

import PropTypes from 'prop-types'
import './LiensGrid.scss'

const allCards = {
  airtable: {
    id: 'airtable',
    label: 'Airtable',
    icon: AirtableLogo,
    href: 'https://airtable.com',
  },
  clickup: {
    id: 'clickup',
    label: 'Clickup',
    icon: ClickupLogo,
    href: 'https://clickup.com',
  },
  discord: {
    id: 'discord',
    label: 'Discord',
    icon: DiscordLogo,
    href: 'https://discord.com/channels/@me',
  },
  figma: {
    id: 'figma',
    label: 'Figma',
    icon: FigmaLogo,
    href: 'https://figma.com',
  },
  facebook: {
    id: 'facebook',
    label: 'Facebook',
    icon: FacebookLogo,
    href: 'https://facebook.com',
  },
  gdrive: {
    id: 'gdrive',
    label: 'Google-drive',
    icon: GDriveLogo,
    href: 'https://drive.google.com/',
  },
  github: {
    id: 'github',
    label: 'Github',
    icon: GithubLogo,
    href: 'https://github.com',
  },
  gmail: {
    id: 'gmail',
    label: 'Gmail',
    icon: GmailLogo,
    href: 'https://gmail.com',
  },
  linkedin: {
    id: 'linkedin',
    label: 'Linkedin',
    icon: LinkedinLogo,
    href: 'https://linkedin.com',
  },
  medium: {
    id: 'medium',
    label: 'Medium',
    icon: MediumLogo,
    href: 'https://medium.com',
  },
  miro: {
    id: 'miro',
    label: 'Miro',
    icon: MiroLogo,
    href: 'https://miro.com',
  },
  notion: {
    id: 'notion',
    label: 'Notion',
    icon: NotionLogo,
    href: 'https://notion.so',
  },
  onedrive: {
    id: 'onedrive',
    label: 'Onedrive',
    icon: OneDriveLogo,
    href: 'https://onedrive.com',
  },
  pocket: {
    id: 'pocket',
    label: 'Pocket',
    icon: PocketLogo,
    href: 'https://pocket.com',
  },
  reddit: {
    id: 'reddit',
    label: 'Reddit',
    icon: RedditLogo,
    href: 'https://reddit.com',
  },
  slack: {
    id: 'slack',
    label: 'Slack',
    icon: SlackLogo,
    href: 'https://slack.com',
  },
  telegram: {
    id: 'telegram',
    label: 'Telegram',
    icon: TelegramLogo,
    href: 'https://telegram.com',
  },
  todoist: {
    id: 'todoist',
    label: 'Todoist',
    icon: TodoistLogo,
    href: 'https://todoist.com',
  },
  x: {
    id: 'x',
    label: 'X',
    icon: XLogo,
    href: 'https://x.com',
  },
  youtube: {
    id: 'youtube',
    label: 'YouTube',
    icon: YoutubeLogo,
    href: 'https://youtube.com',
  },
}

const generateSlots = (count, prefix) =>
  Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`)

const initialLayout = {
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
  const [layout, setLayout] = useState(initialLayout)
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event, section) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const fromSlot = Object.keys(layout[section]).find(
      (key) => layout[section][key] === active.id
    )
    const toSlot = over.id

    setLayout((prev) => {
      const updated = { ...prev }
      updated[section] = {
        ...updated[section],
        [fromSlot]: null,
        [toSlot]: active.id,
      }
      return updated
    })
  }

  return (
    <section className="liens-grid-two">
      <div className="section social-section">
        <h2>
          {' '}
          <img
            src={SocialNetworkLogo}
            alt="Réseaux sociaux"
            className="icon-title"
          />{' '}
          Réseaux sociaux{' '}
        </h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(e) => handleDragEnd(e, 'social')}
        >
          <div className="grid">
            {generateSlots(12, 'social').map((slotId) => (
              <DroppableSlot key={slotId} id={slotId}>
                {layout.social[slotId] && (
                  <DraggableCard {...allCards[layout.social[slotId]]} />
                )}
              </DroppableSlot>
            ))}
          </div>
        </DndContext>
      </div>

      <div className="separator" />

      <div className="section services-section">
        <h2>
          {' '}
          <img
            src={ToolsLogo}
            alt="Services & Outils"
            className="icon-title"
          />{' '}
          Services & Outils{' '}
        </h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(e) => handleDragEnd(e, 'services')}
        >
          <div className="grid">
            {generateSlots(12, 'services').map((slotId) => (
              <DroppableSlot key={slotId} id={slotId}>
                {layout.services[slotId] && (
                  <DraggableCard {...allCards[layout.services[slotId]]} />
                )}
              </DroppableSlot>
            ))}
          </div>
        </DndContext>
      </div>
    </section>
  )
}

function DraggableCard({ id, icon, label, href }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({ id })
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
    touchAction: 'manipulation',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <IconCard icon={icon} label={label} href={href} />
    </div>
  )
}

function DroppableSlot({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id })
  return (
    <div ref={setNodeRef} className={`slot${isOver ? ' over' : ''}`}>
      {children}
    </div>
  )
}

DraggableCard.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

DroppableSlot.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
}
