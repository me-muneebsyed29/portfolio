import { Hero } from "@/components/sections/hero";
import { Brands } from "@/components/sections/brands";
import { Work } from "@/components/sections/work";
import { HowIWork } from "@/components/sections/how-i-work";
import { KindWords } from "@/components/sections/kind-words";
import { Lab } from "@/components/sections/lab";
import { FieldNotes } from "@/components/sections/field-notes";
import { Hello } from "@/components/sections/hello";
import { Contact } from "@/components/sections/contact";
import { NatureFinale } from "@/components/sky/nature-finale";

/*
 * Page order from the sky direction doc: proof before philosophy. Real
 * numbers within one scroll, a case study within two, and the personal bit
 * as the warm-up right before the ask.
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
      <NatureFinale>
        <Hello />
        <Contact />
      </NatureFinale>
    </>
  );
}
