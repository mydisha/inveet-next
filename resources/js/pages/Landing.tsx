import Header from '../components/Header';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturesShowcase from '../components/FeaturesShowcase';
import Services from '../components/Services';
import InvitationShowcase from '../components/InvitationShowcase';
import HowItWorks from '../components/HowItWorks';
import StepByStep from '../components/StepByStep';
import Pricing from '../components/Pricing';
import ComparisonTable from '../components/ComparisonTable';
import About from '../components/About';
import FAQ from '../components/FAQ';
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
          <WhyChooseUs />
          <FeaturesShowcase />
          <Services />
          <InvitationShowcase />
          <HowItWorks />
          <StepByStep />
          <Pricing />
          <ComparisonTable />
          <About />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </PerformanceOptimizer>
  );
}
