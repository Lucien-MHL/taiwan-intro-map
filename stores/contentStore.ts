import { create } from 'zustand'
import { ContentData, CityId } from '@/types/content'
import data from '@/data/intros.json'

interface ContentState {
  currentContent: ContentData
  setContent: (cityId: CityId | null) => void
}

export const useContentStore = create<ContentState>((set) => ({
  currentContent: data.taiwanContent,
  setContent: (cityId) => {
    const { cityContent, taiwanContent } = data
    set({
      currentContent:
        cityId && cityContent[cityId] ? cityContent[cityId] : taiwanContent
    })
  }
}))
