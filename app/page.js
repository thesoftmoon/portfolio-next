import HeroBanner from "./components/HeroBanner"
import WoAre from "./components/WoAre"
import Events from "./components/Events"
import Contact from "./components/Contact"
import Team from "./components/Team"

export const metadata = {
  title: 'Next Js Portofolio',
  description: 'Test',
}

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <WoAre />
      <Team/>
      <Events/>
      <Contact/>
    </div>
  )
}
