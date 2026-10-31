import About from '../components/About';
import Benefits from '../components/Benefits';
import CTAForm from '../components/CTAForm';
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
        <div className="glass form-panel consultation-panel rounded-[2rem] p-6 sm:p-10 lg:p-12">
          <div className="consultation-heading-block">
            <p className="eyebrow">Book a free consultation</p>
            <h2 id="consultation-heading" className="section-title mt-4">Let&apos;s Discuss Your <span className="editorial-highlight">Business Growth</span></h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              Share a few details about your business, and let&apos;s explore how a customized digital marketing strategy can help you move toward your goals.
            </p>
          </div>
          <div className="consultation-layout">
            <CTAForm />
            <aside className="consultation-info" aria-labelledby="consultation-value-heading">
              <p className="eyebrow">A focused conversation</p>
              <h3 id="consultation-value-heading">What You&apos;ll Get From Your Free Consultation</h3>
              <div className="consultation-benefits">
                {[
                  ['Business Analysis', 'Understand your current business situation, marketing activities, and potential areas for improvement.'],
                  ['Marketing Opportunities', 'Identify opportunities to improve your online presence, reach potential customers, and generate more leads.'],
                  ['Customized Marketing Plan', 'Receive a practical digital marketing strategy based on your business goals and current challenges.'],
                  ['Practical Recommendations', 'Discover actionable steps that can help you improve your marketing efforts and work toward business growth.'],
                ].map(([title, description], index) => (
                  <article className="consultation-benefit" key={title}>
                    <span className="consultation-benefit-icon" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <div><h4>{title}</h4><p>{description}</p></div>
                  </article>
                ))}
              </div>
              <p className="consultation-statement">Your business deserves a strategy built around its goals, challenges, and opportunities.</p>
              <p className="consultation-assurance">Free <span aria-hidden="true">•</span> No obligation <span aria-hidden="true">•</span> Focused on your business</p>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
