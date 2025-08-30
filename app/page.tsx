import { Intro } from '@/components/Intro'
import { TaiwanSvgMap } from '@/components/TaiwanSvgMap'

export default function Home() {
  return (
    <div className="relative h-screen w-full bg-zinc-800">
      <TaiwanSvgMap />
      <Intro />
    </div>
  )
}
