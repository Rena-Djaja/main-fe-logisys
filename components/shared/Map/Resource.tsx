import { StyleOption } from '@/type/Map'
import {
  MapIcon,
  MonitorSmartphone,
  SatelliteIcon,
  TreesIcon,
} from 'lucide-react'

export const STYLE_OPTIONS: StyleOption[] = [
  {
    id: 'streets-v12',
    label: 'Map',
    icon: <MapIcon className="size-5" />,
  },
  {
    id: 'satellite-streets-v12',
    label: 'Satellite',
    icon: <SatelliteIcon className="size-5" />,
  },
  {
    id: 'outdoors-v12',
    label: 'Terrain',
    icon: <TreesIcon className="size-5" />,
  },
  {
    id: 'system',
    label: 'System',
    icon: <MonitorSmartphone className="size-5" />,
  },
]
