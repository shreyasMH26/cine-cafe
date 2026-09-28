import { useState } from "react";
import CinematicIntro from "./components/CinematicIntro";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import PriceExperience from "./components/PriceExperience";
import CustomerForm from "./components/CustomerForm";
import MissionDetails from "./components/MissionDetails";
import SponsorSection from "./components/SponsorSection";
import TeamSection from "./components/TeamSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ScrollSpider from "./components/ScrollSpider";
import WebCursor from "./components/WebCursor";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {/* Cinematic intro */}
      <CinematicIntro onComplete={() => setIntroComplete(true)} />

      {/* Web cursor / touch burst overlay */}
      <WebCursor />

      {/* Scroll spider on right edge */}
      {introComplete && <ScrollSpider />}

      {/* Main page content */}
      <AnimatePresence>
        {introComplete && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Hero />
            <MenuSection />
            <PriceExperience />
            <CustomerForm />
            <MissionDetails />
            <TeamSection />
            <SponsorSection />
            <ContactSection />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
