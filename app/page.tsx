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
    <main className="bg-glow min-h-screen overflow-hidden">
      <Header />
      <Hero />
      <Problem />
      <Benefits />
      <Process />
      <About />
      <section id="consultation-form" className="section-shell scroll-mt-6 pb-24 sm:pb-32">
        <div className="glass rounded-[2rem] p-6 sm:p-10 lg:p-12">
          <p className="eyebrow">Take the next step</p>
          <h2 className="section-title mt-4">Let’s Talk About Your Business</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Share a few details so I can understand what you would like to discuss and prepare for a more useful one-to-one conversation.
          </p>
          <CTAForm />
        </div>
      </section>
      <FinalCTA />
      <Footer />
    </main>
  );
}
