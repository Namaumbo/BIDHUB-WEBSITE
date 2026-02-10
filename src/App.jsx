import './App.css'
import Geometry from './componets/Geometry'
import BackgroundGradient from './componets/Gradient'

function App() {
  const features = [
    {
      title: 'Post What You Want',
      description:
        'Tell sellers what you need (with details and photos if you have them). Your request goes live instantly.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8.414a1 1 0 0 0-.293-.707l-4.414-4.414A1 1 0 0 0 12.586 3H7Zm10 17H7V4h5v4a1 1 0 0 0 1 1h4v11Z"
          />
        </svg>
      ),
    },
    {
      title: 'Receive Seller Offers',
      description:
        'Sellers compete by sending you bids with price, delivery options, and item condition so you can compare easily.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M4 19a1 1 0 0 1-1-1V6a1 1 0 0 1 2 0v12h16a1 1 0 0 1 0 2H4Zm6-3a1 1 0 0 1-.707-1.707l4-4a1 1 0 0 1 1.414 0l1.793 1.793 3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0L14 12.414l-3.293 3.293A1 1 0 0 1 10 16Z"
          />
        </svg>
      ),
    },
    {
      title: 'Pick the Best Deal',
      description:
        'Choose the offer that fits your budget and timeline. You stay in control from the first bid to the final deal.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12 2 20 6v6c0 5.25-3.438 9.938-8 11-4.563-1.062-8-5.75-8-11V6l8-4Zm0 2.236L6 7v5c0 4.166 2.563 8.01 6 9.764 3.438-1.754 6-5.598 6-9.764V7l-6-2.764Z"
          />
        </svg>
      ),
    },
    {
      title: 'Trusted Seller Network',
      description:
        'Browse seller profiles and build confidence with clear communication and a growing community of verified users.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 1a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm8 2c-3.314 0-6 1.79-6 4v2h12v-2c0-2.21-2.686-4-6-4Zm-8 1c-.998 0-1.93.146-2.73.4A4.53 4.53 0 0 1 8 18v2H2v-2c0-1.484 1.226-2.78 3.05-3.5A9.7 9.7 0 0 1 8 15Z"
          />
        </svg>
      ),
    },
    {
      title: 'Real-time Updates',
      description: 'Get notified as new offers come in and track everything in one place.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm1-13a1 1 0 0 0-2 0v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586Z"
          />
        </svg>
      ),
    },
    {
      title: 'Better Prices, Faster',
      description: 'Competition drives better prices for buyers and more sales for sellers — everyone wins.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M7 17a1 1 0 0 1-.707-1.707l9-9A1 1 0 0 1 17 7v3a1 1 0 0 1-2 0V9.414l-7.293 7.293A1 1 0 0 1 7 17Zm0 4a1 1 0 0 1-1-1v-3a1 1 0 0 1 2 0v2h14a1 1 0 0 1 0 2H7Z"
          />
        </svg>
      ),
    },
  ]

  const marketInsights = [
    {
      title: 'Price It Right (Don’t Over/Underprice)',
      description:
        'See what buyers are actually requesting and what sellers are offering. This helps you set fair prices that sell faster — without leaving money on the table.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 14.5V18a1 1 0 0 1-2 0v-1.5a3.5 3.5 0 0 1-3-3.5 1 1 0 0 1 2 0 1.5 1.5 0 0 0 3 0c0-.828-.724-1.25-2.09-1.77C9.27 10.71 8 9.9 8 8a3.5 3.5 0 0 1 3-3.5V4a1 1 0 0 1 2 0v.5a3.5 3.5 0 0 1 3 3.5 1 1 0 0 1-2 0 1.5 1.5 0 0 0-3 0c0 .828.724 1.25 2.09 1.77C14.73 10.29 16 11.1 16 13a3.5 3.5 0 0 1-3 3.5Z"
          />
        </svg>
      ),
    },
    {
      title: 'Connect to People Who Need What You Sell',
      description:
        'Instead of guessing, BidHub brings you direct requests from buyers. Sellers can respond with offers and market to real, ready-to-buy demand.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 1a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm8 2c-3.314 0-6 1.79-6 4v2h12v-2c0-2.21-2.686-4-6-4Zm-8 1c-.998 0-1.93.146-2.73.4A4.53 4.53 0 0 1 8 18v2H2v-2c0-1.484 1.226-2.78 3.05-3.5A9.7 9.7 0 0 1 8 15Z"
          />
        </svg>
      ),
    },
    {
      title: 'Forecast What the Market Wants',
      description:
        'Buyer requests reveal trends early. Use demand signals to decide what to stock, what to promote, and how to price for your next sale.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M4 19a1 1 0 0 1-1-1V6a1 1 0 0 1 2 0v12h16a1 1 0 0 1 0 2H4Zm6-3a1 1 0 0 1-.707-1.707l4-4a1 1 0 0 1 1.414 0l1.793 1.793 3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0L14 12.414l-3.293 3.293A1 1 0 0 1 10 16Z"
          />
        </svg>
      ),
    },
  ]

  const howItWorks = [
    {
      step: '01',
      title: 'Create Your Account',
      description: 'Sign up in seconds and start posting requests right away.',
    },
    {
      step: '02',
      title: 'Post What You Want',
      description: 'Describe the item you want, your budget, and delivery preference (optional photos).',
    },
    {
      step: '03',
      title: 'Get Seller Bids',
      description: 'Sellers send competitive offers with price, availability, and delivery details.',
    },
    {
      step: '04',
      title: 'Choose & Buy',
      description: 'Compare offers, chat if needed, then pick the best one and complete the deal.',
    },
  ]

  const plans = [
    {
      name: 'Starter',
      price: '$0',
      subtitle: 'Perfect for getting started',
      bullets: ['Post up to 3 requests/month', 'Receive seller bids', 'Standard support'],
    },
    {
      name: 'Professional',
      price: '$19',
      subtitle: 'For regular buyers & sellers',
      featured: true,
      bullets: ['Unlimited requests', 'Priority visibility for faster bids', 'Priority support'],
    },
    {
      name: 'Enterprise',
      price: '$49',
      subtitle: 'For teams and high-volume sellers',
      bullets: ['Team roles & permissions', 'Advanced security controls', 'Dedicated success manager'],
    },
  ]

  return (
    <div className="app">
      <header className="header" id="top">
        <div className="container">
          <nav className="nav" aria-label="Primary">
            <a className="brand" href="#top" aria-label="BidHub home">
              BidHub
            </a>

            <div className="nav-right">
              <a className="nav-link" href="#features">
                Features
              </a>
              <a className="nav-link" href="#how-it-works">
                How It Works
              </a>
              <a className="nav-link" href="#pricing">
                Pricing
              </a>
              <a className="btn btn-primary btn-sm" href="#pricing">
                Get Started
              </a>
            </div>
          </nav>
        </div>
      </header>
      <main>
        <BackgroundGradient>
          <section className="hero" id="home">
            <div className="container">
              <div className="hero-grid">
                <div>
                  <h1 className="hero-title">
                    Request It
                    <br /> Compare Offers.
                  </h1>
                  <p className="hero-subtitle">
                    Tell us what you’re looking for and receive competitive offers from sellers.
                    Compare price, delivery, and availability — then pick the best deal.
                  </p>

                  <div className="hero-actions">
                    <a className="btn btn-primary" href="#pricing">
                      Post a Request
                      <span className="btn-icon" aria-hidden="true">
                        ›
                      </span>
                    </a>
                    <a className="btn btn-outline" href="#features">
                      See How It Works
                    </a>
                  </div>
                </div>




                <div aria-hidden="true">
                  <div className="">


                    <video src="https://ouch-prod-src-cdn.icons8.com/vk/videos/e8DFV7jJQkPjJQxr.webm" autoPlay muted loop className="hero-gavel" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </BackgroundGradient>
        <section className="stats" aria-label="BidHub stats">
          <div className="container">
            <div className="stats-grid">
              <div className="stat">
                <div className="stat-value">50K+</div>
                <div className="stat-label">Active Buyers</div>
              </div>
              <div className="stat">
                <div className="stat-value">100K+</div>
                <div className="stat-label">Requests Posted</div>
              </div>
              <div className="stat">
                <div className="stat-value">$5M+</div>
                <div className="stat-label">Offers Made</div>
              </div>
            </div>
          </div>
        </section>
        <Geometry>
          <section className="section" id="features">
            <div className="container">
              <div className="section-header">
                <h2>Why Choose BidHub?</h2>
                <p>
                  Everything you need to post what you want and receive competitive seller bids from a
                  trusted community.
                </p>
              </div>

              <div className="cards-grid">
                {features.map((f) => (
                  <div className="card" key={f.title}>
                    <div className="card-icon" aria-hidden="true">
                      {f.icon}
                    </div>
                    <h3 className="card-title">{f.title}</h3>
                    <p className="card-text">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section section-alt" aria-label="Pricing and market insights">
            <div className="container">
              <div className="section-header">
                <h2>Pricing & Market Insights</h2>
                <p>
                  BidHub helps buyers get fair deals and helps sellers price correctly, reach people in
                  need, and understand what the market wants.
                </p>
              </div>

              <div className="cards-grid">
                {marketInsights.map((m) => (
                  <div className="card" key={m.title}>
                    <div className="card-icon" aria-hidden="true">
                      {m.icon}
                    </div>
                    <h3 className="card-title">{m.title}</h3>
                    <p className="card-text">{m.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section section-alt" id="how-it-works">
            <div className="container">
              <div className="section-header">
                <h2>How It Works</h2>
                <p>Post a request, receive offers, and choose the best seller — all in 4 simple steps.</p>
              </div>

              <div className="steps-grid">
                {howItWorks.map((s, idx) => (
                  <div className="step-card" key={s.step}>
                    <div className="step-number">{s.step}</div>
                    <h3 className="step-title">{s.title}</h3>
                    <p className="step-text">{s.description}</p>
                    {idx < howItWorks.length - 1 ? (
                      <div className="step-arrow" aria-hidden="true">
                        ›
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="pricing">
            <div className="container">
              <div className="section-header">
                <h2>Simple, Transparent Pricing</h2>
                <p>Choose the plan that works best for you</p>
              </div>

              <div className="pricing-grid">
                {plans.map((p) => (
                  <div className={`price-card ${p.featured ? 'featured' : ''}`} key={p.name}>
                    <div className="price-top">
                      <h3 className="price-name">{p.name}</h3>
                      <div className="price-value">
                        {p.price}
                        <span className="price-per">/mo</span>
                      </div>
                      <p className="price-subtitle">{p.subtitle}</p>
                    </div>

                    <ul className="price-list">
                      {p.bullets.map((b) => (
                        <li key={b}>
                          <span className="check" aria-hidden="true">
                            ✓
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      className={`btn ${p.featured ? 'btn-primary' : 'btn-outline'} btn-block`}
                      href="#cta"
                    >
                      Get Started
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="cta" id="cta">
            <div className="container">
              <h2>Ready to Get Better Deals?</h2>
              <p>
                Post what you want today and let sellers compete to give you the best price and delivery.
              </p>
              <a className="btn btn-primary" href="#top">
                Post Your First Request
              </a>
            </div>
          </section>
        </Geometry>
      </main>



      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">BidHub</div>
              <p>Post what you want and let sellers compete for your business.</p>
            </div>

            <div className="footer-col">
              <div className="footer-title">Product</div>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#how-it-works">Security</a>
            </div>

            <div className="footer-col">
              <div className="footer-title">Company</div>
              <a href="#top">About</a>
              <a href="#top">Blog</a>
              <a href="#cta">Contact</a>
            </div>

            <div className="footer-col">
              <div className="footer-title">Legal</div>
              <a href="#top">Privacy</a>
              <a href="#top">Terms</a>
              <a href="#top">Cookies</a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>&copy; 2026 BidHub. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
