import './App.css'
import Geometry from './componets/Geometry'
import BackgroundGradient from './componets/Gradient'
import { useEffect, useMemo, useState } from 'react'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileMenuOpen])

  const navLinks = useMemo(
    () => [
      { href: '#features', label: 'Features' },
      { href: '#examples', label: 'Examples' },
      { href: '#marketplaces', label: 'Marketplaces' },
      { href: '#popular-requests', label: 'Popular' },
      { href: '#how-it-works', label: 'How It Works' },
      { href: '#pricing', label: 'Pricing' },
    ],
    [],
  )

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

  const acceptedExamples = [
    {
      title: 'Phones & Laptops',
      description: 'New or used devices, accessories, repairs, and upgrades.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm10 2H7v16h10V4Zm-4 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          />
        </svg>
      ),
    },
    {
      title: 'Construction Materials',
      description: 'Cement, iron sheets, paint, tools, plumbing, electrical supplies.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12 2 2 7v10l10 5 10-5V7L12 2Zm0 2.236L20 8v.764l-8 4-8-4V8l8-3.764ZM4 10.236l7 3.5V20.2l-7-3.5v-6.464Zm16 0V16.7l-7 3.5v-6.464l7-3.5Z"
          />
        </svg>
      ),
    },
    {
      title: 'Groceries & Household',
      description: 'Bulk groceries, cleaning supplies, home essentials, deliveries.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M7 4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h2a1 1 0 0 1 1 1v3a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V8a1 1 0 0 1 1-1h2V4Zm2 3h6V5H9v2Zm-3 2v2a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V9H6Z"
          />
        </svg>
      ),
    },
    {
      title: 'Services',
      description: 'Transport, home repairs, tailoring, printing, events, and more.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4Zm2 5V6a2 2 0 0 0-4 0v1h4Zm-4 8v1a2 2 0 0 0 4 0v-1h-4Zm-3-2h10a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Z"
          />
        </svg>
      ),
    },
    {
      title: 'Vehicles & Parts',
      description: 'Cars/motorbikes, parts, tyres, batteries, servicing and repairs.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M5 11 6.5 6.5A3 3 0 0 1 9.343 4h5.314A3 3 0 0 1 17.5 6.5L19 11v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7Zm3.343-5a1 1 0 0 0-.949.684L6.613 9h10.774l-.781-2.316A1 1 0 0 0 15.657 6H8.343ZM7.5 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
          />
        </svg>
      ),
    },
    {
      title: 'Wholesale & Bulk',
      description: 'Stock requests for shops: beverages, food, electronics, supplies.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M21 7 12 2 3 7v10l9 5 9-5V7Zm-2 1.236V16l-7 3.889V12.5l7-4.264ZM12 4.264 18.764 8 12 11.736 5.236 8 12 4.264ZM5 9.236l7 4.264v7.389L5 16V9.236Z"
          />
        </svg>
      ),
    },
  ]

  const popularRequests = [
    'iPhone 12/13 (used)',
    'Samsung A-series',
    'Laptop (Core i5, 8GB RAM)',
    'Wi‑Fi router',
    'Cement (50kg)',
    'Iron sheets',
    'Solar panel + inverter',
    'Groceries (bulk)',
    'Motorbike tyres',
    'Car battery',
    'Printer + ink',
    'Transport / delivery',
    'Tailoring',
    'Event chairs & tents',
  ]

  const popularShowcase = [
    { title: 'iPhone 13 (used)', meta: 'Lilongwe • Budget: MWK 650k', user: 'TN', img: '/showcase/phone.svg' },
    { title: 'Laptop (Core i5, 8GB)', meta: 'Blantyre • Need today', user: 'MS', img: '/showcase/laptop.svg' },
    { title: 'Cement (50kg x 200)', meta: 'Zomba • Delivery needed', user: 'BK', img: '/showcase/construction.svg' },
    { title: 'Solar kit (1.5kW)', meta: 'Mzuzu • Install included', user: 'RJ', img: '/showcase/solar.svg' },
    { title: 'Groceries (bulk)', meta: 'Area 25 • Weekly supply', user: 'AM', img: '/showcase/groceries.svg' },
    { title: 'Transport / delivery', meta: 'City wide • Same day', user: 'LK', img: '/showcase/transport.svg' },
    { title: 'Event chairs & tents', meta: 'Weekend • 200 seats', user: 'DM', img: '/showcase/construction.svg' },
    { title: 'Printer + ink', meta: 'University • Student rates', user: 'FN', img: '/showcase/laptop.svg' },
  ]

  const marketplaceCards = [
    {
      title: 'All listings in one place',
      description:
        'Instead of jumping between WhatsApp and Facebook, BidHub can bring relevant listings into one feed so you can compare faster.',
    },
    {
      title: 'If bids are low, we still help',
      description:
        'When you don’t get enough seller offers, we can surface matching listings from connected marketplaces so you still have options.',
    },
    {
      title: 'Market signals for sellers',
      description:
        'Sellers can spot what buyers are asking for, connect to people in need, and forecast demand to stock smarter.',
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
              {navLinks.map((l) => (
                <a className="nav-link" href={l.href} key={l.href}>
                  {l.label}
                </a>
              ))}
              <a className="btn btn-primary btn-sm" href="#pricing">
                Get Started
              </a>
            </div>

            <button
              type="button"
              className="menu-toggle"
              aria-label="Open menu"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen ? 'true' : 'false'}
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              <span className="menu-toggle-bars" aria-hidden="true" />
            </button>
          </nav>
        </div>

        {mobileMenuOpen ? (
          <>
            <button
              type="button"
              className="mobile-menu-backdrop"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="mobile-menu" id="mobile-menu" role="dialog" aria-label="Menu">
              <div className="mobile-menu-links">
                {navLinks.map((l) => (
                  <a
                    className="mobile-menu-link"
                    href={l.href}
                    key={l.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              <a className="btn btn-primary btn-block" href="#pricing" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </a>
            </div>
          </>
        ) : null}
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

          <section className="section section-alt" id="examples" aria-label="Examples of what you can post">
            <div className="container">
              <div className="section-header">
                <h2>What You Can Request on BidHub</h2>
                <p>
                  Post what you want to buy (or a service you need). Sellers respond with offers you can
                  compare.
                </p>
              </div>

              <div className="cards-grid">
                {acceptedExamples.map((e) => (
                  <div className="card" key={e.title}>
                    <div className="card-icon" aria-hidden="true">
                      {e.icon}
                    </div>
                    <h3 className="card-title">{e.title}</h3>
                    <p className="card-text">{e.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="marketplaces" aria-label="Marketplace aggregation">
            <div className="container">
              <div className="section-header">
                <h2>All Marketplaces, One Place</h2>
                <p>
                  We’re building integrations to bring listings from WhatsApp and Facebook into a single
                  experience — especially helpful when seller bids are not available.
                </p>
              </div>

              <div className="cards-grid">
                {marketplaceCards.map((c) => (
                  <div className="card" key={c.title}>
                    <h3 className="card-title">{c.title}</h3>
                    <p className="card-text">{c.description}</p>
                  </div>
                ))}
              </div>

              <p className="section-note">
                Integrations depend on what’s permitted by each platform and the groups/pages you connect.
              </p>
            </div>
          </section>

          <section className="section section-alt" id="popular-requests" aria-label="Popular requests">
            <div className="container">
              <div className="section-header">
                <h2>Popular Requests</h2>
                <p>
                  Live-style examples of what people post — scroll through and copy the wording to start
                  fast.
                </p>
              </div>

              <div className="marquee" aria-label="Popular requests showcase">
                <div className="marquee-track">
                  <div className="marquee-group" role="list" aria-label="Popular requests">
                    {popularShowcase.map((s) => (
                      <div className="showcase-card" role="listitem" key={s.title}>
                        <div className="showcase-media" aria-hidden="true">
                          <img src={s.img} alt="" loading="lazy" decoding="async" />
                        </div>
                        <div className="showcase-top">
                          <div className="showcase-avatar" aria-hidden="true">
                            {s.user}
                          </div>
                          <div className="showcase-ping" aria-hidden="true" />
                        </div>
                        <div className="showcase-title">{s.title}</div>
                        <div className="showcase-meta">{s.meta}</div>
                      </div>
                    ))}
                  </div>

                  <div className="marquee-group" aria-hidden="true">
                    {popularShowcase.map((s) => (
                      <div className="showcase-card" key={`dup-${s.title}`}>
                        <div className="showcase-media">
                          <img src={s.img} alt="" loading="lazy" decoding="async" />
                        </div>
                        <div className="showcase-top">
                          <div className="showcase-avatar">{s.user}</div>
                          <div className="showcase-ping" />
                        </div>
                        <div className="showcase-title">{s.title}</div>
                        <div className="showcase-meta">{s.meta}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="section-note">
                Tip: Don’t overprice or underprice — you’ll get better results when your budget is close to
                what the market is offering.
              </p>
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
