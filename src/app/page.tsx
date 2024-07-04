import { Contact } from "components/Contact";
import { Experience } from "components/Experience";
import { HeroText } from "components/HeroText";
import { SubHeroText } from "components/SubHeroText";
import { Summary } from "components/Summary";

export default function Home() {
  return (
    <main>
      <HeroText />
      <SubHeroText />
      <Summary />
      <Experience />
      <Contact />
    </main>
  );
}
