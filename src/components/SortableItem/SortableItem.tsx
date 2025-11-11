import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import IconCard from '@/components/iconCard/IconCard'

interface SortableItemProps {
  id: string
  icon: string
  label: string
  href: string
}

export function SortableItem({ id, icon, label, href }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'manipulation' as const,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <IconCard icon={icon} label={label} href={href} />
    </div>
  )
}
