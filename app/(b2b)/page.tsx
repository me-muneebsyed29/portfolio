import { Hero } from "@/components/sections/hero";
import { Brands } from "@/components/sections/brands";
import { Work } from "@/components/sections/work";
import { HowIWork } from "@/components/sections/how-i-work";
import { KindWords } from "@/components/sections/kind-words";
import { Lab } from "@/components/sections/lab";
import { FieldNotes } from "@/components/sections/field-notes";
import { Hello } from "@/components/sections/hello";
import { Contact } from "@/components/sections/contact";
import { Finale } from "@/components/studio/finale";

/*
 * Proof before philosophy: real numbers within one scroll, a case study
 * within two, and the personal bit as the warm-up right before the ask.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <Work />
      <HowIWork />
      <KindWords />
      <Lab />
      <FieldNotes />
      <Finale>
        <Hello />
        <Contact />
      </Finale>
    </>
  );
}
