import { useState, useEffect } from "react";
import CinematicIntro from "./components/CinematicIntro";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import PriceExperience from "./components/PriceExperience";
import CustomerForm from "./components/CustomerForm";
import GamesSection from "./components/GamesSection";
import MissionDetails from "./components/MissionDetails";
import SponsorSection from "./components/SponsorSection";
import TeamSection from "./components/TeamSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ScrollSpider from "./components/ScrollSpider";
import WebCursor from "./components/WebCursor";
import { AnimatePresence, motion } from "framer-motion";

// Routing and Admin Pages
import { useNavigation } from "./hooks/useNavigation";
import { initVisitorTracking } from "./utils/analytics";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerRegistration from "./pages/CustomerRegistration";
import FastRedeem from "./pages/FastRedeem";

export default function App() {
  const { currentPath, navigate } = useNavigation();
  const [introComplete, setIntroComplete] = useState(false);

  // Initialize analytics visitor tracking for all page entries
  useEffect(() => {
    initVisitorTracking();
  }, [currentPath]);

  // Check if current route is an Admin portal page
  const isAdminRoute = currentPath.startsWith("/admin");

  if (isAdminRoute) {
    if (currentPath === "/admin/customers") {
      return <CustomerRegistration onNavigate={navigate} onLogout={() => navigate("/")} />;
    }
    if (currentPath === "/admin/redeem") {
      return <FastRedeem onNavigate={navigate} />;
    }
    // Default admin fallback: Dashboard
    return <AdminDashboard onNavigate={navigate} onLogout={() => navigate("/")} />;
  }

  // Public Event / Ticket Page
  return (
    <>
      {/* Cinematic intro (only plays on initial public entry) */}
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
            <GamesSection />
            <CustomerForm />
            <MissionDetails />
            <TeamSection />
            <SponsorSection />
            <ContactSection />
            <Footer onNavigate={navigate} />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
