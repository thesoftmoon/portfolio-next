import HeroBanner from "./components/HeroBanner"
import WoAre from "./components/WoAre"
import HeroSection from "./components/HeroSection"

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <WoAre />
      <HeroSection leftText={false} />
      <HeroSection leftText={true} />
    </div>
  )
}
