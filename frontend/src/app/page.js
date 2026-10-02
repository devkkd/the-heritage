import Experiences from "@/components/Experiences";
import Facilities from "@/components/Facilities";


import Hero from "@/components/Hero";
import InstagramSection from "@/components/Instagramsection";
import OurSuites from "@/components/Oursuites";
import ResortStory from "@/components/ResortStory";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <>

<Hero />
<ResortStory />
<Facilities />
{/* <OurSuites /> */}
<Experiences />
<Reviews />
<div style={{ width: "100%", height: "1px", background: "#AAA396" }} />
<InstagramSection />
     
    </>
  );
}