import About from '../components/About';
import Benefits from '../components/Benefits';
import CTAForm from '../components/CTAForm';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Process from '../components/Process';

export default function HomePage() {
  return (
    <main id="top" className="bg-glow min-h-screen overflow-hidden">
      <Header />
      <Hero />
      <Problem />
      <Benefits />
      <Process />
      <About />
      <section id="consultation-form" className="section-shell anchor-section pb-24 sm:pb-32" aria-labelledby="consultation-heading">
        <div className="glass form-panel rounded-[2rem] p-6 sm:p-10 lg:p-12">
          <p className="eyebrow">Request a consultation</p>
          <h2 id="consultation-heading" className="section-title mt-4">Let’s Talk About Your Business</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Share a few details about your business and the marketing challenge you&apos;d like to discuss. This will help me prepare for our conversation.
          </p>
          <CTAForm />
        </div>
      </section>
      <FinalCTA />
      <Footer />
    </main>
  );
}
