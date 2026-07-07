import { Hero } from '@/components/home/Hero'
import { RoleTabs } from '@/components/home/RoleTabs'
import { ModulesGrid } from '@/components/home/ModulesGrid'
import { WhyChoose } from '@/components/home/WhyChoose'
import { TechPartners } from '@/components/home/TechPartners'
import { Testimonials } from '@/components/home/Testimonials'
import { CTASection } from '@/components/home/CTASection'
import { PrincipalMessage } from '@/components/home/PrincipalMessage'
import { AcademicPrograms } from '@/components/home/AcademicPrograms'
import { FacilitiesPreview } from '@/components/home/FacilitiesPreview'
import { AchievementsPreview } from '@/components/home/AchievementsPreview'
import { LatestEvents } from '@/components/home/LatestEvents'
import { AdmissionProcess } from '@/components/home/AdmissionProcess'
import { Scholarships } from '@/components/home/Scholarships'

function Divider() {
  return <div className="divider-gradient" />
}

export default function Home() {
  return (
    <>
      <Hero />
      <PrincipalMessage />
      <Divider />
      <AcademicPrograms />
      <TechPartners />
      <Divider />
      <ModulesGrid />
      <Divider />
      <RoleTabs />
      <Divider />
      <FacilitiesPreview />
      <AchievementsPreview />
      <Divider />
      <LatestEvents />
      <Divider />
      <AdmissionProcess />
      <Scholarships />
      <Divider />
      <WhyChoose />
      <Divider />
      <Testimonials />
      <CTASection />
    </>
  )
}
