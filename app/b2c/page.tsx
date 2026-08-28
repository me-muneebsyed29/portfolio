import { B2CHero } from "@/components/b2c/hero";
import { B2CMetrics } from "@/components/b2c/metrics";
import { B2CProblems } from "@/components/b2c/problems";
import { B2CChannels } from "@/components/b2c/channels";
import { B2CCaseStudies } from "@/components/b2c/case-studies";
import { B2CProcess } from "@/components/b2c/process";
import { B2CComparison } from "@/components/b2c/comparison";
import { B2CTestimonials } from "@/components/b2c/testimonials";
import { B2CFaq } from "@/components/b2c/faq";
import { B2CContact } from "@/components/b2c/contact";

export default function B2CPage() {
  return (
    <>
      <B2CHero />
      <B2CMetrics />
      <B2CProblems />
      <B2CChannels />
      <B2CCaseStudies />
      <B2CProcess />
      <B2CComparison />
      <B2CTestimonials />
      <B2CFaq />
      <B2CContact />
    </>
  );
}
