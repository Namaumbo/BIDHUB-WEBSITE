import './App.css'
import { Reveal, RevealStagger } from './componets/Reveal'
import { useEffect, useRef, useState, useMemo } from 'react'

/* ─── Unsplash portrait helper (hotlinked from Unsplash CDN) ── */
const face = (id, s = 160) =>
  `https://images.unsplash.com/photo-${id}?w=${s}&h=${s}&q=70&auto=format&fit=crop&crop=faces`

/* ─── Decorative bits (Peppermint-style sparkles & swirls) ─── */
function Sparkle({ className = '' }) {
  return (
    <svg className={`sparkle ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 0c1.2 6.9 4.9 10.8 12 12-7.1 1.2-10.8 5.1-12 12-1.2-6.9-4.9-10.8-12-12C7.1 10.8 10.8 6.9 12 0Z" />
    </svg>
  )
}

function TitleSwirl() {
  return (
    <svg className="title-swirl" viewBox="0 0 260 26" aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M4 19C50 7 96 5 128 12c30 7 53 10 80 4 17-4 32-7 48-4"
        fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round"
      />
    </svg>
  )
}

function HeroSwirl({ className = '' }) {
  return (
    <svg className={`hero-swirl ${className}`} viewBox="0 0 120 90" aria-hidden="true">
      <path
        d="M6 70C20 30 52 8 76 16c20 7 16 32-2 34-15 2-22-14-10-26C76 12 102 14 114 38"
        fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round"
      />
    </svg>
  )
}

/* ─── Scroll-driven laptop demo ─────────────────────── */
function clamp01(v) { return Math.min(1, Math.max(0, v)) }

function LaptopScrolly({ scenes }) {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      setProgress(total > 0 ? clamp01(-rect.top / total) : 0)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const reduced = useMemo(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false,
    [],
  )

  // phase 1: lid opens — phase 2: screen content scrolls through the scenes
  const open = reduced ? 1 : clamp01(progress / 0.22)
  const slide = clamp01((progress - 0.28) / 0.68) * (scenes.length - 1)
  const active = Math.round(slide)

  return (
    <div className="scrolly" ref={sectionRef}>
      <div className="scrolly-sticky">
        <div className="scrolly-grid">

          <div className="scrolly-captions">
            {scenes.map((s, i) => (
              <div key={s.title} className={`scrolly-caption tone-${s.tone}${i === active ? ' is-active' : ''}`}>
                <div className="scrolly-caption-num">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div className="scrolly-caption-title">{s.title}</div>
                  <p className="scrolly-caption-text">{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="laptop-wrap" aria-hidden="true">
            <Sparkle className="laptop-star-1" />
            <Sparkle className="laptop-star-2" />
            <div className="laptop" style={{ '--open': open, '--slide': slide }}>
              <div className="laptop-lid">
                <div className="laptop-screen">
                  <div className="laptop-chrome">
                    <span className="chrome-dot cd-1" />
                    <span className="chrome-dot cd-2" />
                    <span className="chrome-dot cd-3" />
                    <span className="chrome-url">bidhub.mw</span>
                  </div>
                  <div className="laptop-viewport">
                    <div className="laptop-slides">
                      {scenes.map((s) => (
                        <div className="laptop-slide" key={s.title}>{s.screen}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="laptop-base"><span className="laptop-notch" /></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

/* ─── Animated counter hook ────────────────────────── */
function useCountUp(target, duration = 2000) {
  const [val, setVal] = useState(0)
  const triggered = useRef(false)
  const elRef = useRef(null)
  useEffect(() => {
    const el = elRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !triggered.current) {
        triggered.current = true
        obs.disconnect()
        let n = 0
        const inc = target / (duration / 16)
        const id = setInterval(() => {
          n += inc
          if (n >= target) { setVal(target); clearInterval(id) }
          else setVal(Math.floor(n))
        }, 16)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])
  return [val, elRef]
}

/* ─── Stat card with counter ────────────────────────── */
function StatCard({ target, suffix, label, tone, revealIndex }) {
  const [val, ref] = useCountUp(target)
  return (
    <div className={`stat tone-${tone} reveal-child`} ref={ref} style={{ '--reveal-i': revealIndex }}>
      <Sparkle className="stat-sparkle" />
      <div className="stat-value">{val}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

/* ─── Hero animated phone mock ──────────────────────── */
function HeroMock() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 900),
      setTimeout(() => setStep(2), 1700),
      setTimeout(() => setStep(3), 2500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const bids = [
    { ab: 'TS', name: 'TechStore Lil.', price: 'MWK 580,000', stars: 5 },
    { ab: 'PH', name: 'PhoneHub MW',    price: 'MWK 600,000', stars: 4 },
    { ab: 'IM', name: 'iMart Deals',    price: 'MWK 570,000', stars: 5, best: true },
  ]

  return (
    <div className="hero-mock" aria-label="Live bidding demo">
      <div className="hero-shape" aria-hidden="true" />
      <Sparkle className="hero-star hero-star-1" />
      <Sparkle className="hero-star hero-star-2" />
      <Sparkle className="hero-star hero-star-3" />
      <HeroSwirl className="hero-swirl-pink" />

      <div className="mock-phone">
        {/* top bar */}
        <div className="mock-topbar">
          <div className="mock-topbar-brand">
            <span className="mock-topbar-dot" />
            BidHub
          </div>
          <div className="mock-live-pill">
            <span className="mock-live-dot" aria-hidden="true" />
            Live
          </div>
        </div>

        {/* request card */}
        <div className="mock-request-card">
          <div className="mock-req-emoji" aria-hidden="true">📱</div>
          <div className="mock-req-info">
            <div className="mock-req-title">iPhone 13 (used)</div>
            <div className="mock-req-meta">Budget MWK 650,000 · Lilongwe</div>
          </div>
          <div className="mock-req-badge" aria-live="polite">
            <strong>{step}</strong>
            <span>bid{step !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* bids list */}
        <div className="mock-bids-label">Incoming bids</div>
        <div className="mock-bids-list">
          {bids.map((b, i) => (
            <div
              key={b.name}
              className={`mock-bid-row${i < step ? ' mock-bid-visible' : ''}${b.best ? ' mock-bid-best' : ''}`}
            >
              <div className="mock-bid-av">{b.ab}</div>
              <div className="mock-bid-meta">
                <div className="mock-bid-seller">{b.name}</div>
                <div className="mock-bid-stars" aria-label={`${b.stars} stars`}>
                  {'★'.repeat(b.stars)}{'☆'.repeat(5 - b.stars)}
                </div>
              </div>
              <div className="mock-bid-right">
                {b.best && <div className="mock-best-tag">Best</div>}
                <div className="mock-bid-price">{b.price}</div>
                <button className="mock-accept-btn" tabIndex={-1} aria-hidden="true">Accept</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* floating micro-badges */}
      <div className="mock-float-1" aria-hidden="true">
        <span>🔔</span> New bid!
      </div>
      <div className="mock-float-2" aria-hidden="true">
        <span>💰</span> Save 30%
      </div>
    </div>
  )
}

/* ─── App ────────────────────────────────────────────── */
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!mobileMenuOpen) return
    const fn = (e) => { if (e.key === 'Escape') setMobileMenuOpen(false) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [mobileMenuOpen])

  const navLinks = useMemo(() => [
    { href: '#features',     label: 'Features'     },
    { href: '#examples',     label: 'Categories'   },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#pricing',      label: 'Pricing'      },
    { href: '#faq',          label: 'FAQ'          },
  ], [])

  const cities = [
    'Lilongwe','Blantyre','Mzuzu','Zomba','Salima',
    'Kasungu','Mangochi','Dedza','Karonga','Nkhotakota',
  ]

  const laptopScenes = [
    {
      title: 'Post what you want',
      text: 'Describe the item, set your budget, add a photo — your request goes live instantly.',
      tone: 'yellow',
      screen: (
        <div className="ls ls-form">
          <div className="ls-heading">New request ✍️</div>
          <div className="ls-field">
            <span className="ls-label">What do you want?</span>
            <span className="ls-value">iPhone 13 (used) 📱</span>
          </div>
          <div className="ls-field">
            <span className="ls-label">Your budget</span>
            <span className="ls-value">MWK 650,000</span>
          </div>
          <div className="ls-field">
            <span className="ls-label">Location</span>
            <span className="ls-value">Lilongwe</span>
          </div>
          <div className="ls-btn">Post request →</div>
        </div>
      ),
    },
    {
      title: 'Offers roll in, live',
      text: 'Sellers compete for your request with real prices, delivery options and condition — updated in real time.',
      tone: 'pink',
      screen: (
        <div className="ls ls-bids">
          <div className="ls-heading">
            Incoming bids
            <span className="ls-live"><span className="ls-live-dot" />Live</span>
          </div>
          {[
            { ab: 'TS', name: 'TechStore Lil.', price: '580k', stars: '★★★★★' },
            { ab: 'PH', name: 'PhoneHub MW',    price: '600k', stars: '★★★★☆' },
            { ab: 'IM', name: 'iMart Deals',    price: '570k', stars: '★★★★★' },
          ].map((b) => (
            <div className="ls-bid" key={b.ab}>
              <span className="ls-bid-av">{b.ab}</span>
              <span className="ls-bid-name">{b.name}<em>{b.stars}</em></span>
              <span className="ls-bid-price">MWK {b.price}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Compare & pick a winner',
      text: 'Stack offers side by side and check verified seller ratings before you commit to anything.',
      tone: 'mint',
      screen: (
        <div className="ls ls-compare">
          <div className="ls-heading">Compare offers ⚖️</div>
          <div className="ls-compare-row">
            <div className="ls-offer">
              <span className="ls-offer-price">600k</span>
              <span className="ls-offer-meta">3 days</span>
            </div>
            <div className="ls-offer ls-offer-best">
              <span className="ls-offer-tag">Best</span>
              <span className="ls-offer-price">570k</span>
              <span className="ls-offer-meta">Same day</span>
            </div>
            <div className="ls-offer">
              <span className="ls-offer-price">580k</span>
              <span className="ls-offer-meta">Tomorrow</span>
            </div>
          </div>
          <div className="ls-btn">Accept best offer ✓</div>
        </div>
      ),
    },
    {
      title: 'Close the deal & save',
      text: 'Competition drives prices down — accept the best bid and arrange delivery. Everyone wins.',
      tone: 'sky',
      screen: (
        <div className="ls ls-done">
          <div className="ls-done-check">✓</div>
          <div className="ls-done-title">Deal closed!</div>
          <div className="ls-done-sub">You saved <strong>MWK 80,000</strong> 🎉</div>
        </div>
      ),
    },
  ]

  const acceptedExamples = [
    {
      title: 'Phones & Laptops',
      description: 'New or used devices, accessories, repairs, and upgrades.',
      img: '/showcase/phone.svg',
      tone: 'sky',
    },
    {
      title: 'Construction Materials',
      description: 'Cement, iron sheets, paint, tools, plumbing, electrical supplies.',
      img: '/showcase/construction.svg',
      tone: 'yellow',
    },
    {
      title: 'Groceries & Household',
      description: 'Bulk groceries, cleaning supplies, home essentials, deliveries.',
      img: '/showcase/groceries.svg',
      tone: 'mint',
    },
    {
      title: 'Services',
      description: 'Transport, home repairs, tailoring, printing, events, and more.',
      img: '/showcase/transport.svg',
      tone: 'pink',
    },
    {
      title: 'Vehicles & Parts',
      description: 'Cars/motorbikes, parts, tyres, batteries, servicing and repairs.',
      img: '/showcase/transport.svg',
      tone: 'lavender',
    },
    {
      title: 'Wholesale & Bulk',
      description: 'Stock requests for shops: beverages, food, electronics, supplies.',
      img: '/showcase/laptop.svg',
      tone: 'cream',
    },
  ]

  const marketInsights = [
    {
      title: 'Price It Right',
      description: 'See what buyers are actually requesting and what sellers are offering. Set fair prices that sell faster — without leaving money on the table.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 14.5V18a1 1 0 0 1-2 0v-1.5a3.5 3.5 0 0 1-3-3.5 1 1 0 0 1 2 0 1.5 1.5 0 0 0 3 0c0-.828-.724-1.25-2.09-1.77C9.27 10.71 8 9.9 8 8a3.5 3.5 0 0 1 3-3.5V4a1 1 0 0 1 2 0v.5a3.5 3.5 0 0 1 3 3.5 1 1 0 0 1-2 0 1.5 1.5 0 0 0-3 0c0 .828.724 1.25 2.09 1.77C14.73 10.29 16 11.1 16 13a3.5 3.5 0 0 1-3 3.5Z"/></svg>
      ),
    },
    {
      title: 'Connect to Ready Buyers',
      description: 'Instead of guessing, BidHub brings you direct requests from buyers. Respond with offers and market to real, ready-to-buy demand.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 1a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm8 2c-3.314 0-6 1.79-6 4v2h12v-2c0-2.21-2.686-4-6-4Zm-8 1c-.998 0-1.93.146-2.73.4A4.53 4.53 0 0 1 8 18v2H2v-2c0-1.484 1.226-2.78 3.05-3.5A9.7 9.7 0 0 1 8 15Z"/></svg>
      ),
    },
    {
      title: 'Forecast Demand',
      description: 'Buyer requests reveal trends early. Use demand signals to decide what to stock, what to promote, and how to price for your next sale.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 19a1 1 0 0 1-1-1V6a1 1 0 0 1 2 0v12h16a1 1 0 0 1 0 2H4Zm6-3a1 1 0 0 1-.707-1.707l4-4a1 1 0 0 1 1.414 0l1.793 1.793 3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0L14 12.414l-3.293 3.293A1 1 0 0 1 10 16Z"/></svg>
      ),
    },
  ]

  const popularShowcase = [
    { title: 'iPhone 13 (used)',      meta: 'Lilongwe · MWK 650k',      user: 'TN', img: '/showcase/phone.svg',        photo: face('1539571696357-5a69c17a67c6') },
    { title: 'Laptop (Core i5, 8GB)',  meta: 'Blantyre · Need today',     user: 'MS', img: '/showcase/laptop.svg',       photo: face('1573496359142-b8d87734a5a2') },
    { title: 'Cement (50kg x 200)',    meta: 'Zomba · Delivery needed',   user: 'BK', img: '/showcase/construction.svg', photo: face('1560250097-0b93528c311a') },
    { title: 'Solar kit (1.5kW)',      meta: 'Mzuzu · Install included',  user: 'RJ', img: '/showcase/solar.svg',        photo: face('1507003211169-0a1dd7228f2d') },
    { title: 'Groceries (bulk)',       meta: 'Area 25 · Weekly supply',   user: 'AM', img: '/showcase/groceries.svg',    photo: face('1567532939604-b6b5b0db2604') },
    { title: 'Transport / delivery',   meta: 'City wide · Same day',      user: 'LK', img: '/showcase/transport.svg',   photo: face('1506794778202-cad84cf45f1d') },
    { title: 'Event chairs & tents',   meta: 'Weekend · 200 seats',       user: 'DM', img: '/showcase/construction.svg', photo: face('1573497019940-1c28c88b4f3e') },
    { title: 'Printer + ink',          meta: 'University · Student rates',user: 'FN', img: '/showcase/laptop.svg',       photo: face('1544717305-2782549b5136') },
  ]

  const testimonials = [
    {
      quote: 'I posted a request for a camera lens in the morning and had five bids by lunch. Picked the best one and saved MWK 45,000.',
      name: 'Thoko M.',
      role: 'Photographer · Lilongwe',
      tone: 'yellow',
      photo: face('1531384441138-2736e62e0919', 200),
    },
    {
      quote: 'As a shop owner, BidHub shows me exactly what people want to buy. I stopped guessing what to stock.',
      name: 'Grace B.',
      role: 'Shop owner · Blantyre',
      tone: 'pink',
      photo: face('1573497019940-1c28c88b4f3e', 200),
    },
    {
      quote: 'No more endless WhatsApp groups. One request, and sellers come to me with their best prices.',
      name: 'James C.',
      role: 'Reseller · Mzuzu',
      tone: 'mint',
      photo: face('1522529599102-193c0d76b5b6', 200),
    },
  ]

  const heroFaces = [
    face('1522529599102-193c0d76b5b6', 96),
    face('1573496359142-b8d87734a5a2', 96),
    face('1531384441138-2736e62e0919', 96),
    face('1567532939604-b6b5b0db2604', 96),
  ]

  const howItWorks = [
    { step: '01', tone: 'yellow', title: 'Create Your Account', description: 'Sign up in seconds and start posting requests right away.' },
    { step: '02', tone: 'pink',   title: 'Post What You Want',  description: 'Describe the item, your budget, and delivery preference (optional photos).' },
    { step: '03', tone: 'mint',   title: 'Get Seller Bids',     description: 'Sellers send competitive offers with price, availability, and delivery details.' },
    { step: '04', tone: 'sky',    title: 'Choose & Buy',        description: 'Compare offers, chat if needed, then pick the best one and complete the deal.' },
  ]

  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      subtitle: 'Perfect for getting started',
      bullets: ['Post up to 3 requests/month', 'Receive seller bids', 'Standard support'],
    },
    {
      name: 'Professional',
      price: 'MK500',
      subtitle: 'For regular buyers & sellers',
      featured: true,
      bullets: ['Unlimited requests', 'Priority visibility for faster bids', 'Priority support'],
    },
    {
      name: 'Enterprise',
      price: 'MK1,000',
      subtitle: 'For teams and high-volume sellers',
      bullets: ['Team roles & permissions', 'Advanced security controls', 'Dedicated success manager'],
    },
  ]

  const faqs = [
    {
      q: 'What exactly is BidHub?',
      a: 'BidHub is a reverse marketplace for Malawi. Instead of browsing endless listings, you post what you want to buy and sellers come to you with competing offers. You compare price, delivery, and condition — then pick the winner.',
    },
    {
      q: 'Is it free to post a request?',
      a: 'Yes! The Starter plan lets you post up to 3 requests every month for free. If you buy or sell regularly, the Professional plan unlocks unlimited requests and priority visibility.',
    },
    {
      q: 'How do sellers find my request?',
      a: 'Your request is categorised and shown to sellers who deal in that category and operate in your area. Relevant sellers get notified instantly, so bids usually start arriving within minutes.',
    },
    {
      q: 'How do payments and delivery work?',
      a: 'You agree on the details directly with the seller you choose — mobile money (Airtel Money, TNM Mpamba), bank transfer, or cash on delivery. Each bid includes the seller\'s delivery options so there are no surprises.',
    },
    {
      q: 'Are sellers verified?',
      a: 'Sellers build public profiles with ratings and reviews from completed deals, and we verify business details for our seller network. You can always check a seller\'s track record before accepting their bid.',
    },
    {
      q: 'Which cities does BidHub cover?',
      a: 'BidHub is active across Malawi — Lilongwe, Blantyre, Mzuzu, Zomba and beyond. The more specific your location, the better your matches.',
    },
    {
      q: 'Can I sell on BidHub too?',
      a: 'Absolutely. Create a seller profile, browse live buyer requests in your categories, and respond with your best offer. It\'s direct access to people who are ready to buy right now.',
    },
  ]

  return (
    <div className="app">

      {/* ── Header ──────────────────────────────────── */}
      <header className="header" id="top">
        <div className="container">
          <nav className="nav" aria-label="Primary">
            <a className="brand" href="#top" aria-label="BidHub home">
              Bid<span className="brand-accent">Hub</span>
            </a>

            <div className="nav-right">
              {navLinks.map((l) => (
                <a className="nav-link" href={l.href} key={l.href}>{l.label}</a>
              ))}
              <a className="btn btn-primary btn-sm" href="#pricing">Get BidHub</a>
            </div>

            <button
              type="button"
              className="menu-toggle"
              aria-label="Open menu"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen ? 'true' : 'false'}
              onClick={() => setMobileMenuOpen(v => !v)}
            >
              <span className="menu-toggle-bars" aria-hidden="true" />
            </button>
          </nav>
        </div>

        {mobileMenuOpen && (
          <>
            <button type="button" className="mobile-menu-backdrop" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)} />
            <div className="mobile-menu" id="mobile-menu" role="dialog" aria-label="Menu">
              <div className="mobile-menu-links">
                {navLinks.map((l) => (
                  <a className="mobile-menu-link" href={l.href} key={l.href} onClick={() => setMobileMenuOpen(false)}>{l.label}</a>
                ))}
              </div>
              <a className="btn btn-primary btn-block" href="#pricing" onClick={() => setMobileMenuOpen(false)}>Get BidHub</a>
            </div>
          </>
        )}
      </header>

      <main>

        {/* ── Hero ────────────────────────────────────── */}
        <section className="hero" id="home">
          <HeroSwirl className="hero-swirl-purple" />
          <Sparkle className="hero-star hero-star-left" />
          <div className="container">
            <div className="hero-grid">

              {/* Left */}
              <div className="hero-left">
                <div className="hero-eyebrow hero-animate">
                  <span className="hero-eyebrow-dot" aria-hidden="true" />
                  Reverse marketplace for Malawi
                </div>

                <h1 className="hero-title hero-animate hero-animate-delay-1">
                  Want something?<br />
                  Make sellers{' '}
                  <span className="hero-title-highlight">
                    compete.
                    <TitleSwirl />
                  </span>
                </h1>

                <p className="hero-subtitle hero-animate hero-animate-delay-2">
                  Post what you're looking for and sit back — trusted sellers send you
                  competing offers with price, delivery, and availability. You pick the best one. 🎉
                </p>

                <div className="hero-actions hero-animate hero-animate-delay-3">
                  <a className="btn btn-primary btn-lg" href="#pricing">
                    Post a Request
                    <span className="btn-icon" aria-hidden="true">→</span>
                  </a>
                  <a className="btn btn-outline btn-lg" href="#how-it-works">How it works</a>
                </div>

                <div className="hero-pills hero-animate hero-animate-delay-3" aria-label="Key benefits">
                  <div className="hero-pill tone-yellow">
                    <svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0Z"/></svg>
                    Free to post
                  </div>
                  <div className="hero-pill tone-pink">
                    <svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M11.3 1.046A1 1 0 0 1 12 2v5h4a1 1 0 0 1 .82 1.573l-7 10A1 1 0 0 1 8 18v-5H4a1 1 0 0 1-.82-1.573l7-10a1 1 0 0 1 1.12-.38Z"/></svg>
                    Fast bids
                  </div>
                  <div className="hero-pill tone-mint">
                    <svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1l2.928 5.938L20 8.09l-5 4.872 1.18 6.878L10 16.7l-6.18 3.14L5 12.962 0 8.09l7.072-1.152L10 1Z"/></svg>
                    Verified sellers
                  </div>
                </div>

                <div className="hero-social-proof hero-animate hero-animate-delay-3">
                  <div className="avatar-stack" aria-hidden="true">
                    {heroFaces.map((src, i) => (
                      <img key={i} src={src} alt="" loading="lazy" decoding="async" />
                    ))}
                  </div>
                  <div className="hero-social-text">
                    <span className="hero-social-stars" aria-hidden="true">★★★★★</span>
                    Loved by <strong>50K+ buyers</strong> across Malawi
                  </div>
                </div>
              </div>

              {/* Right: animated mock */}
              <div className="hero-right hero-animate hero-animate-delay-3" aria-hidden="true">
                <HeroMock />
              </div>
            </div>
          </div>
        </section>

        {/* ── City ticker ───────────────────────────── */}
        <div className="city-bar" aria-label="Active cities">
          <div className="city-bar-inner">
            {[...cities, ...cities].map((c, i) => (
              <span key={i} className="city-item" aria-hidden={i >= cities.length ? 'true' : undefined}>
                <span className="city-star" aria-hidden="true">✦</span>
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* ── Stats ─────────────────────────────────── */}
        <section className="stats" aria-label="BidHub stats">
          <div className="container">
            <RevealStagger className="stats-grid">
              <StatCard target={50}  suffix="K+" label="Active Buyers"   tone="yellow" revealIndex={0} />
              <StatCard target={100} suffix="K+" label="Requests Posted" tone="pink"   revealIndex={1} />
              <StatCard target={5}   suffix="M+" label="Offers Made"     tone="mint"   revealIndex={2} />
            </RevealStagger>
          </div>
        </section>

        {/* ── Features (scroll-driven laptop demo) ──── */}
        <section className="section section-scrolly" id="features">
          <div className="container">
            <Reveal className="section-header">
              <div className="section-eyebrow">Why BidHub</div>
              <h2>Shopping, but in reverse</h2>
              <p>Scroll to see what happens after you post a request — straight from the BidHub app.</p>
            </Reveal>
          </div>

          <LaptopScrolly scenes={laptopScenes} />
        </section>

        {/* ── Examples ──────────────────────────────── */}
        <section className="section section-alt" id="examples" aria-label="Examples of what you can post">
          <div className="container">
            <Reveal className="section-header">
              <div className="section-eyebrow">Categories</div>
              <h2>Ask for (almost) anything</h2>
              <p>Post what you want to buy (or a service you need). Sellers respond with offers you can compare.</p>
            </Reveal>

            <RevealStagger className="examples-grid">
              {acceptedExamples.map((e, i) => (
                <div className="example-card reveal-child" key={e.title} style={{ '--reveal-i': i }}>
                  <div className={`example-img-wrap tone-${e.tone}`}>
                    <img src={e.img} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="example-body">
                    <h3 className="example-title">{e.title}</h3>
                    <p className="example-text">{e.description}</p>
                  </div>
                </div>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* ── How It Works ──────────────────────────── */}
        <section className="section" id="how-it-works">
          <div className="container">
            <Reveal className="section-header">
              <div className="section-eyebrow">Process</div>
              <h2>Four steps. Zero haggling stress.</h2>
              <p>Post a request, receive offers, and choose the best seller — all in 4 simple steps.</p>
            </Reveal>

            <RevealStagger className="steps-grid">
              {howItWorks.map((s, i) => (
                <div className="step-card reveal-child" key={s.step} style={{ '--reveal-i': i }}>
                  <div className={`step-number tone-${s.tone}`}>{s.step}</div>
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-text">{s.description}</p>
                  {i < howItWorks.length - 1 && (
                    <svg className="step-arrow" viewBox="0 0 48 24" aria-hidden="true">
                      <path d="M2 12h40m0 0-8-8m8 8-8 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* ── Lifestyle: BidHub on the go ───────────── */}
        <section className="lifestyle" aria-label="BidHub on the go">
          <Sparkle className="lifestyle-star-1" />
          <Sparkle className="lifestyle-star-2" />
          <div className="container">
            <div className="lifestyle-grid">

              <Reveal className="lifestyle-media">
                <div className="lifestyle-photo-wrap">
                  <img
                    className="lifestyle-photo"
                    src="https://images.unsplash.com/photo-1605896163420-830698e44fb1?w=620&h=720&q=75&auto=format&fit=crop"
                    alt="A man smiling while checking bids on his phone"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="lifestyle-card lifestyle-card-welcome" aria-hidden="true">
                    <div className="lc-title">Welcome back, Thoko! 👋</div>
                    <div className="lc-request">
                      <span className="lc-request-label">Your request</span>
                      <strong>iPhone 13 (used)</strong>
                    </div>
                    <div className="lc-bids">
                      <span className="lc-bids-num">3</span>
                      new bids waiting
                    </div>
                    <div className="lc-btn">View bids →</div>
                  </div>

                  <div className="lifestyle-card lifestyle-card-bid" aria-hidden="true">
                    <span className="lc-bell">🔔</span>
                    <div>
                      <div className="lc-bid-title">New bid · MWK 570,000</div>
                      <div className="lc-bid-meta">iMart Deals · Same-day delivery</div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal className="lifestyle-copy" delay={120}>
                <div className="section-eyebrow on-dark">On the go</div>
                <h2>Deals find you, wherever you are</h2>
                <p className="lifestyle-text">
                  Stuck in traffic in Lilongwe or stocking your shop in Mzuzu — post a request
                  from your phone and let the offers chase <em>you</em> for a change.
                </p>

                <ul className="lifestyle-list">
                  <li><span className="check" aria-hidden="true">✓</span> Post a request in under a minute</li>
                  <li><span className="check" aria-hidden="true">✓</span> Get notified the second a bid lands</li>
                  <li><span className="check" aria-hidden="true">✓</span> Chat, compare, and close — all in one place</li>
                </ul>

                <a className="btn btn-yellow btn-lg" href="#pricing">
                  Post a Request
                  <span className="btn-icon" aria-hidden="true">→</span>
                </a>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ── Popular Requests ──────────────────────── */}
        <section className="section section-alt" id="popular-requests" aria-label="Popular requests">
          <div className="container">
            <Reveal className="section-header">
              <div className="section-eyebrow">Trending</div>
              <h2>What people are asking for</h2>
              <p>Live-style examples of what people post — scroll through and copy the wording to start fast.</p>
            </Reveal>
          </div>

          <Reveal className="marquee" delay={80} aria-label="Popular requests showcase">
            <div className="marquee-track">
              <div className="marquee-group" role="list" aria-label="Popular requests">
                {popularShowcase.map((s) => (
                  <div className="showcase-card" role="listitem" key={s.title}>
                    <div className="showcase-media" aria-hidden="true">
                      <img src={s.img} alt="" loading="lazy" decoding="async" />
                    </div>
                    <div className="showcase-top">
                      <img className="showcase-avatar" src={s.photo} alt={s.user} loading="lazy" decoding="async" />
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
                    <div className="showcase-media"><img src={s.img} alt="" loading="lazy" decoding="async" /></div>
                    <div className="showcase-top">
                      <img className="showcase-avatar" src={s.photo} alt="" loading="lazy" decoding="async" />
                      <div className="showcase-ping" />
                    </div>
                    <div className="showcase-title">{s.title}</div>
                    <div className="showcase-meta">{s.meta}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="container">
            <Reveal className="section-note" delay={100}>
              Tip: Don't overprice or underprice — you'll get better results when your budget is close to what the market is offering.
            </Reveal>
          </div>
        </section>

        {/* ── For Sellers (navy panel) ──────────────── */}
        <section className="section" aria-label="Pricing and market insights">
          <div className="container">
            <div className="sellers-panel">
              <Sparkle className="sellers-star sellers-star-1" />
              <Sparkle className="sellers-star sellers-star-2" />
              <Reveal className="section-header sellers-header">
                <div className="section-eyebrow on-dark">For Sellers</div>
                <h2>Sellers, this one's for you 💼</h2>
                <p>BidHub helps you price correctly, reach people in need, and understand exactly what the market wants.</p>
              </Reveal>

              <RevealStagger className="insights-grid">
                {marketInsights.map((m, i) => (
                  <div className="insight-card reveal-child" key={m.title} style={{ '--reveal-i': i }}>
                    <div className="insight-icon">{m.icon}</div>
                    <h3 className="insight-title">{m.title}</h3>
                    <p className="insight-text">{m.description}</p>
                  </div>
                ))}
              </RevealStagger>
            </div>
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────── */}
        <section className="section" id="testimonials" aria-label="What our users say">
          <div className="container">
            <Reveal className="section-header">
              <div className="section-eyebrow">Testimonials</div>
              <h2>Word on the street 💬</h2>
              <p>Real buyers and sellers across Malawi on what changed when sellers started competing for them.</p>
            </Reveal>

            <RevealStagger className="testi-grid">
              {testimonials.map((t, i) => (
                <figure className={`testi-card tone-${t.tone} reveal-child`} key={t.name} style={{ '--reveal-i': i }}>
                  <div className="testi-quote-mark" aria-hidden="true">“</div>
                  <blockquote className="testi-quote">{t.quote}</blockquote>
                  <figcaption className="testi-person">
                    <img className="testi-photo" src={t.photo} alt={t.name} loading="lazy" decoding="async" />
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <div className="testi-role">{t.role}</div>
                    </div>
                    <span className="testi-stars" aria-label="5 stars">★★★★★</span>
                  </figcaption>
                </figure>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* ── Pricing ───────────────────────────────── */}
        <section className="section section-alt" id="pricing">
          <div className="container">
            <Reveal className="section-header">
              <div className="section-eyebrow">Plans</div>
              <h2>Simple, honest pricing</h2>
              <p>Choose the plan that works best for you. No hidden fees, ever.</p>
            </Reveal>

            <RevealStagger className="pricing-grid">
              {plans.map((p, i) => (
                <div
                  className={`price-card reveal-child${p.featured ? ' featured' : ''}`}
                  key={p.name}
                  style={{ '--reveal-i': i }}
                >
                  {p.featured && <div className="price-badge">Most Popular</div>}
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
                        <span className="check" aria-hidden="true">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <a className={`btn ${p.featured ? 'btn-accent' : 'btn-outline'} btn-block`} href="#cta">
                    Get Started
                  </a>
                </div>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────── */}
        <section className="section" id="faq">
          <div className="container container-narrow">
            <Reveal className="section-header">
              <div className="section-eyebrow">FAQ</div>
              <h2>Questions? Answered.</h2>
              <p>Everything you've wondered about how BidHub works.</p>
            </Reveal>

            <RevealStagger className="faq-list">
              {faqs.map((f, i) => (
                <details className="faq-item reveal-child" key={f.q} style={{ '--reveal-i': i }}>
                  <summary className="faq-q">
                    {f.q}
                    <span className="faq-toggle" aria-hidden="true" />
                  </summary>
                  <p className="faq-a">{f.a}</p>
                </details>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────── */}
        <section className="cta-section" id="cta">
          <div className="container">
            <Reveal>
              <div className="cta-inner">
                <Sparkle className="cta-star cta-star-1" />
                <Sparkle className="cta-star cta-star-2" />
                <Sparkle className="cta-star cta-star-3" />
                <h2>Ready to get a better deal?</h2>
                <p>Post what you want today and let sellers compete to give you the best price and delivery.</p>
                <div className="cta-actions">
                  <a className="btn btn-dark btn-lg" href="#top">
                    Post Your First Request
                    <span className="btn-icon" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

      </main>

      {/* ── Footer ────────────────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <RevealStagger className="footer-grid">
            <div className="footer-brand reveal-child" style={{ '--reveal-i': 0 }}>
              <div className="footer-logo">BidHub</div>
              <p>Post what you want and let sellers compete for your business.</p>
              <div className="footer-socials" aria-label="Social links">
                {['f', 'tw', 'in'].map(s => (
                  <a key={s} href="#top" className="footer-social-btn" aria-label={s}>{s}</a>
                ))}
              </div>
            </div>

            <div className="footer-col reveal-child" style={{ '--reveal-i': 1 }}>
              <div className="footer-title">Product</div>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
            </div>

            <div className="footer-col reveal-child" style={{ '--reveal-i': 2 }}>
              <div className="footer-title">Company</div>
              <a href="#top">About</a>
              <a href="#top">Blog</a>
              <a href="#cta">Contact</a>
            </div>

            <div className="footer-col reveal-child" style={{ '--reveal-i': 3 }}>
              <div className="footer-title">Legal</div>
              <a href="#top">Privacy</a>
              <a href="#top">Terms</a>
              <a href="#top">Cookies</a>
            </div>
          </RevealStagger>

          <Reveal className="footer-bottom">
            <span>&copy; 2026 BidHub. Made with 💛 in Malawi.</span>
          </Reveal>
        </div>
      </footer>

    </div>
  )
}
