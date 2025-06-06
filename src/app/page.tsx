import { TeamShowcase } from "@/components/aboutcomponent";
import  FeaturesGrid  from "@/components/featuresGrid";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/Homehero";
import {ServicesSection}  from "@/components/services";


export default function Home (){
  return(
    <div>
     <HeroSection/>
     <FeaturesGrid/>
     <ServicesSection/>
     <TeamShowcase/>
     <Footer/>
     
    </div>
  )
}