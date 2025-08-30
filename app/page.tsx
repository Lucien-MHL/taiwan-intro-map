import { Intro } from '@/components/Intro'
import { TaiwanSvgMap } from '@/components/TaiwanSvgMap'
import { BackButton } from '@/components/BackButton'

export default function Home() {
  return (
    <div className="relative h-screen w-full bg-zinc-800">
      <BackButton />
      <TaiwanSvgMap />
      <Intro />
    </div>
  )
}
