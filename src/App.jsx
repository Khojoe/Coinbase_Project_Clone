import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import HeroSection from './components/sections/HeroSection';
import ExploreCryptoSection from './components/sections/ExploreCryptoSection';
import AdvancedTraderSection from './components/sections/AdvancedTraderSection';
import BaseAppSection from './components/sections/BaseAppSection';
import LearnSection from './components/sections/LearnSection';
import TakeControlSection from './components/sections/TakeControlSection';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AccountTypeSelect from './pages/AccountTypeSelect';
import ForgotPassword from './pages/ForgotPassword';
import VerifyCode from './pages/VerifyCode';
import ExplorePage from './pages/ExplorePage';
import MarketStatsPage from './pages/MarketStatsPage';
import LearnPage from './pages/LearnPage';
import CryptoBasicsPage from './pages/CryptoBasicsPage';
import ProfilePage from './pages/ProfilePage';
import AddCryptoPage from './pages/AddCryptoPage';
import Loader from './components/ui/Loader';
import WarningBanner from './components/ui/WarningBanner';
import FooterDisclaimer from './components/ui/FooterDisclaimer';

const Home = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <HeroSection />
      <ExploreCryptoSection />
      <AdvancedTraderSection />
      <BaseAppSection />
      <LearnSection />
      <TakeControlSection />
    </main>
    <Footer />
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0B0D]">
      <WarningBanner />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/market-stats" element={<MarketStatsPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/account-type" element={<AccountTypeSelect />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify" element={<VerifyCode />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/crypto-basics" element={<CryptoBasicsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/add-crypto" element={<AddCryptoPage />} />
        </Routes>
      </div>
      <FooterDisclaimer />
    </div>
  );
};

export default App;
