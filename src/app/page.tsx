import SolutionSection from '@/components/SolutionSection'
import CommitmentJourney from '@/components/CommitmentJourney/CommitmentJourney'
import ImpactSection from '@/components/ImpactSection'
import { HeroSection } from '@/components/landing-page/sections/HeroSection'
import { ProblemSection } from '@/components/landing-page/sections/ProblemSection'
import Footer from '@/components/landing-page/Footer'
import React from 'react'
import ImpactSection from '@/components/ImpactSection'
import Footer from '@/components/landing-page/Footer'

import { ExperienceSection } from "@/components/landing-page/sections/ExperienceSection";
import { Navigation } from "@/components/landing-page/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] overflow-hidden">
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <CommitmentJourney />
        <ImpactSection />
        <SolutionSection />
        <ExperienceSection />
      </main>
      <Footer />
    </div>
  );
}
