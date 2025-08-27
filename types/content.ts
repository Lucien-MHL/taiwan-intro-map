import { cityContent } from '@/data/intros.json'

export interface ContentData {
  id: string
  name: string
  title: string
  description: string
  highlights: string[]
  population?: string
  area?: string
  specialties?: string[]
}

export type CityId = keyof typeof cityContent
