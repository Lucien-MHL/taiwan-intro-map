import { create } from 'zustand'
import { ContentData, CityId } from '@/types/content'
import { taiwanContent, cityContent } from '@/data/intros.json'

interface ContentState {
  currentContent: ContentData
  setContent: (cityId: CityId | null) => void
}

export const useContentStore = create<ContentState>((set) => ({
  currentContent: taiwanContent,
  setContent: (cityId) =>
    set({
      currentContent:
        cityId && cityContent[cityId] ? cityContent[cityId] : taiwanContent
    })
}))
