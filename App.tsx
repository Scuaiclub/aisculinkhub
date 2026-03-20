import React from 'react';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import { FeatureOverlay } from './components/FeatureOverlay';
import { ProfileHeader } from './components/ProfileHeader';
import { SocialLinks } from './components/SocialLinks';
import { LinkCard } from './components/LinkCard';
import { Footer } from './components/Footer';
import { CONFIG } from './constants';
import { AnimatePresence, motion } from 'framer-motion';

// Moved to Home component for routing logic
export const Home: React.FC = () => {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden text-text font-body">
      {/* Background Elements */}
      <BackgroundAnimation />
      <FeatureOverlay />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[480px] px-5 pt-8 md:pt-24 pb-16 flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ProfileHeader
            avatarUrl={CONFIG.avatarUrl}
            title={CONFIG.title}
            subtitle={CONFIG.subtitle}
            logoUrl={CONFIG.logoUrl}
            bio={CONFIG.bio}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <SocialLinks socials={CONFIG.socials} />
        </motion.div>

        <div className="w-full flex flex-col gap-3.5 md:gap-5">
          <AnimatePresence>
            {CONFIG.links.map((link, index) => (
              <motion.div
                key={link.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.4 + (index * 0.1)
                }}
              >
                <LinkCard
                  text={link.text}
                  url={link.url}
                  icon={link.icon}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Footer email={CONFIG.email} />
      </div>
    </main>
  );
};

// Main App Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminDashboard } from './components/AdminDashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;