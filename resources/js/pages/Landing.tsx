import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import InvitationShowcase from '../components/InvitationShowcase';
import StepByStep from '../components/StepByStep';
import Pricing from '../components/Pricing';
import About from '../components/About';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import PerformanceOptimizer from '../components/PerformanceOptimizer';

export default function Landing() {
  return (
    <PerformanceOptimizer>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Services />
          <InvitationShowcase />
          <StepByStep />
          <Pricing />
          <About />
          <CTA />
        </main>
        <Footer />
      </div>
    </PerformanceOptimizer>
  );
}
