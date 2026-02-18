import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { LucideProps } from 'lucide-react'

export interface EmptyPlaceholderProps {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  title: string
  description: string
  buttonText: string
  onClick: () => void
  isError?: boolean
}
