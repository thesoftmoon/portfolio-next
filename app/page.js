import HeroBanner from "./components/HeroBanner"
import WoAre from "./components/WoAre"
import HeroSection from "./components/HeroSection"
import Events from "./components/Events"
import Contact from "./components/Contact"

export const metadata = {
  title: 'Next Js Portofolio',
  description: 'Test',
}

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <WoAre />
      <HeroSection leftText={false} />
      <div className="flex flex-col md:flex-row">
        <HeroSection leftText={false} />
        <HeroSection leftText={false} />
      </div>
      <div className="flex flex-col md:flex-row">
        <HeroSection leftText={true} />
        <HeroSection leftText={true} />
      </div>
      <HeroSection leftText={true} />

      <Events/>
      <Contact/>
    </div>
  )
}
