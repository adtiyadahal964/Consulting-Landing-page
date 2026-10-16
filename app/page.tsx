import Benefits from '../components/Benefits';
import CTAForm from '../components/CTAForm';
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
      <section id="consultation-form" className="section-shell scroll-mt-6 pb-24 sm:pb-32">
        <div className="glass rounded-[2rem] p-6 sm:p-10 lg:p-12">
          <p className="eyebrow">Take the next step</p>
          <h2 className="section-title mt-4">Book Your Free Consultation</h2>
          <p className="mt-5 font-semibold leading-7">
            One-to-One Consultation
            <br />
            Customized Strategy for Your Business
          </p>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            Get focused advice based on your current business situation and understand what to
            improve to generate more qualified leads and sales.
          </p>
          <CTAForm />
        </div>
      </section>
    </main>
  );
}
