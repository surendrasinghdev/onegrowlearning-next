import { CourseExplorer } from "@/components/CourseExplorer";
import {
  Advantage,
  AdvanceCareer,
  container,
  Faq,
  Hero,
  Highlights,
  HowItWorks,
  OnlineAdvantages,
  Rankings,
  SampleDegree,
  Stories,
  Universities,
} from "@/components/blocks";

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <Rankings />
      <section id="programs" className="scroll-mt-24 py-20 sm:py-24">
        <div className={container}>
          <CourseExplorer />
        </div>
      </section>
      <Advantage />
      <Universities />
      <OnlineAdvantages />
      <SampleDegree />
      <HowItWorks />
      <Stories />
      <Faq />
      <AdvanceCareer />
    </>
  );
}
