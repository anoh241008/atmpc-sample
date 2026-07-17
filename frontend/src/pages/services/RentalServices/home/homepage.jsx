import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import IntroScreen from "./introScreen";

// ─── Data ────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    text: "As someone who works from home, I was looking for a well-ventilated unit with reliable power. I've been here for six months and the environment is perfect for staying focused. It really feels like my own private sanctuary.",
    image: "/assets/services/RentalServices/testimonialimages/1stperson.jpg",
    status: "Employee",
  },
  {
    text: "Finding an affordable solo pad that does not sacrifice safety is hard. I am so glad I found this. The management is very responsive, and the community is peaceful. Best value for money in the city.",
    image: "/assets/services/RentalServices/testimonialimages/2ndperson.jpg",
    status: "Employee",
  },
  {
    text: "Finally found a place where I can actually focus! It's quiet enough for late-night study sessions, and the Wi-Fi is surprisingly fast. It's definitely a step up from the noisy dorms I used to stay in.",
    image: "/assets/services/RentalServices/testimonialimages/3rdperson.jpg",
    status: "Student",
  },
  {
    text: "I love the balance of this place. It is walking distance to the grocery store and the main road, yet tucked away enough to be quiet at night. The unit design is very modern and maximizes the space — perfect for a young professional starting out.",
    image: "/assets/services/RentalServices/testimonialimages/4thperson.jpg",
    status: "Employee",
  },
  {
    text: "Walking to my 7 AM classes is now a breeze since I moved here. I don't have to worry about the morning commute or being late. Plus, having 24/7 security makes me and my parents feel a lot safer!",
    image: "/assets/services/RentalServices/testimonialimages/5thperson.jpg",
    status: "Student",
  },
  {
    text: "As a student on a tight budget, I was looking for a room that was affordable but did not feel cheap. This place is clean, modern, and the utility costs are very reasonable. It really helps take the pressure off my monthly allowance!",
    image: "/assets/services/RentalServices/testimonialimages/5thperson.jpg",
    status: "Student",
  },
];

const videos = [
  {
    id: "1",
    src: "/assets/services/RentalServices/carouselVideoList/msu.mp4",
    title: "Marawi Poblacion, Bangon Street, Marawi City",
    description: "Comfortable units walking distance from Mindanao State University and key city establishments and schools.",
  },
  {
    id: "2",
    src: "/assets/services/RentalServices/carouselVideoList/cdo.mp4",
    title: "22nd Street Nazareth, Cagayan De Oro City",
    description: "Modern accommodations near offices, malls, and major transport routes in Misamis Oriental.",
  },
];

// ─── Styles (injected once) ───────────────────────────────────────────────────

const css = `
  .rh-root *, .rh-root *::before, .rh-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .rh-root {
    --g: #1a7a4a;
    --g-dark: #0f5433;
    --g-light: #e8f5ee;
    --g-mid: #2d9e63;
    --text: #111;
    --muted: #555;
    --border: #d4e8dc;
    font-family: 'Segoe UI', system-ui, sans-serif;
    color: var(--text);
    background: #fff;
    overflow-x: hidden;
  }

  /* ── HERO ── */
  .rh-hero {
    position: relative;
    height: 100vh;
    min-height: 560px;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }
  .rh-hero-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }
  .rh-hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(160deg, rgba(10,40,24,.85) 0%, rgba(15,84,51,.7) 60%, rgba(30,120,70,.5) 100%);
    z-index: 1;
  }
  .rh-hero-pattern {
    position: absolute;
    inset: 0;
    opacity: .05;
    background-image: repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%);
    background-size: 20px 20px;
    z-index: 2;
  }
  .rh-hero-content {
    position: relative;
    z-index: 3;
    padding: 0 5vw 10vh;
    max-width: 720px;
  }
  .rh-eyebrow {
    display: inline-block;
    background: rgba(255,255,255,.12);
    color: rgba(255,255,255,.9);
    font-size: .78rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: .3rem .9rem;
    border-radius: 12px;
    margin-bottom: 1.2rem;
  }
  .rh-hero h1 {
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 800;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 1.2rem;
  }
  .rh-hero h1 em { font-style: normal; color: #a8e6c3; }
  .rh-hero-sub {
    font-size: 1.05rem;
    color: rgba(255,255,255,.8);
    line-height: 1.7;
    max-width: 560px;
    margin-bottom: 2rem;
  }
  .rh-hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
  .rh-btn-primary {
    background: #fff;
    color: var(--g-dark);
    padding: .75rem 1.8rem;
    border-radius: 24px;
    font-weight: 700;
    font-size: .95rem;
    text-decoration: none;
    box-shadow: 0 2px 12px rgba(0,0,0,.15);
    transition: transform .15s, box-shadow .15s;
    cursor: pointer;
    border: none;
    display: inline-block;
  }
  .rh-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,.2); }
  .rh-btn-ghost {
    border: 1.5px solid rgba(255,255,255,.5);
    color: #fff;
    padding: .75rem 1.8rem;
    border-radius: 24px;
    font-weight: 600;
    font-size: .95rem;
    text-decoration: none;
    transition: background .2s;
    cursor: pointer;
    background: transparent;
    display: inline-block;
  }
  .rh-btn-ghost:hover { background: rgba(255,255,255,.1); }

  /* slide nav dots */
  .rh-hero-dots {
    position: absolute;
    bottom: 2rem;
    right: 5vw;
    z-index: 4;
    display: flex;
    gap: .6rem;
  }
  .rh-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,.4);
    cursor: pointer;
    border: none;
    transition: background .2s, transform .2s;
  }
  .rh-dot.active { background: #fff; transform: scale(1.3); }

  .rh-hero-stats {
    position: absolute;
    right: 5vw;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .rh-stat {
    background: rgba(255,255,255,.1);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,.2);
    border-radius: 16px;
    padding: .9rem 1.2rem;
    text-align: center;
    min-width: 100px;
  }
  .rh-stat-num { font-size: 1.6rem; font-weight: 800; color: #fff; }
  .rh-stat-label { font-size: .72rem; color: rgba(255,255,255,.7); margin-top: .2rem; }

  /* ── ABOUT ── */
  .rh-about {
    padding: 7rem 5vw;
    max-width: 1200px;
    margin: 0 auto;
  }
  .rh-tag {
    font-size: .78rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--g);
    font-weight: 700;
    margin-bottom: .8rem;
    display: block;
  }
  .rh-title {
    font-size: clamp(1.8rem, 3.5vw, 2.6rem);
    font-weight: 800;
    color: var(--text);
    line-height: 1.15;
    margin-bottom: 1rem;
  }
  .rh-lead {
    font-size: 1rem;
    color: var(--muted);
    line-height: 1.75;
    max-width: 600px;
    margin-bottom: 3rem;
  }
  .rh-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
  }
  .rh-card {
    background: var(--g-light);
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    transition: transform .2s;
  }
  .rh-card:hover { transform: translateY(-4px); }
  .rh-card-icon {
    width: 44px; height: 44px;
    background: var(--g);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.2rem;
    font-size: 1.3rem;
  }
  .rh-card h3 { font-size: 1.15rem; font-weight: 700; margin-bottom: .7rem; color: var(--g-dark); }
  .rh-card p { font-size: .9rem; color: #3a5c4a; line-height: 1.7; }
  .rh-card-accent {
    position: absolute; bottom: -20px; right: -20px;
    width: 80px; height: 80px;
    background: var(--g); opacity: .06; border-radius: 50%;
  }

  /* ── LOCATIONS ── */
  .rh-locations {
    background: var(--g-dark);
    padding: 6rem 5vw;
    text-align: center;
  }
  .rh-locations .rh-tag { color: #a8e6c3; }
  .rh-locations .rh-title { color: #fff; }
  .rh-locations .rh-lead { color: rgba(255,255,255,.7); margin: 0 auto 3rem; }
  .rh-loc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    max-width: 900px;
    margin: 0 auto;
  }
  .rh-loc-card {
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.12);
    border-radius: 20px;
    padding: 2rem;
    text-align: left;
    transition: background .2s;
  }
  .rh-loc-card:hover { background: rgba(255,255,255,.12); }
  .rh-loc-badge {
    display: inline-block;
    background: rgba(168,230,195,.15);
    color: #a8e6c3;
    font-size: .75rem; font-weight: 600;
    letter-spacing: 1px; text-transform: uppercase;
    padding: .3rem .7rem; border-radius: 8px;
    margin-bottom: 1rem;
  }
  .rh-loc-card h3 { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: .5rem; }
  .rh-loc-card p { font-size: .85rem; color: rgba(255,255,255,.6); line-height: 1.6; }
  .rh-loc-contact { margin-top: 1rem; font-size: .82rem; color: #a8e6c3; font-weight: 600; }

  /* ── TESTIMONIALS ── */
  .rh-testimonials { padding: 6rem 5vw; overflow: hidden; }
  .rh-testimonials .rh-tag { text-align: center; }
  .rh-testimonials .rh-title { text-align: center; margin-bottom: 0; }
  .rh-track-wrap { overflow: hidden; margin-top: 3rem; }
  .rh-track {
    display: flex;
    gap: 1.5rem;
    animation: rhSlide 40s linear infinite;
    width: max-content;
  }
  .rh-track:hover { animation-play-state: paused; }
  @keyframes rhSlide { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .rh-tcard {
    flex: 0 0 300px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 1.5rem;
    display: flex; flex-direction: column; gap: .8rem;
  }
  .rh-stars { font-size: .8rem; color: #f5a623; letter-spacing: 1px; }
  .rh-tcard p { font-size: .88rem; color: var(--muted); line-height: 1.7; flex: 1; }
  .rh-tcard-footer { display: flex; align-items: center; gap: .8rem; margin-top: .5rem; }
  .rh-avatar {
    width: 42px; height: 42px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    border: 2px solid var(--border);
  }
  .rh-tcard-name { font-size: .82rem; font-weight: 700; color: var(--text); }
  .rh-tcard-role { font-size: .75rem; color: var(--g); }

  /* ── FOOTER ── */
  .rh-footer { background: #0a3322; padding: 5rem 5vw 2rem; }
  .rh-footer-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    max-width: 960px;
    margin: 0 auto 3rem;
  }
  .rh-footer-brand h2 { font-size: 1.3rem; font-weight: 800; color: #fff; margin-bottom: .8rem; }
  .rh-footer-brand h2 span { color: var(--g-mid); }
  .rh-footer-brand p { font-size: .88rem; color: rgba(255,255,255,.55); line-height: 1.7; max-width: 340px; }
  .rh-socials { display: flex; gap: .7rem; margin-top: 1.5rem; }
  .rh-social {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.1);
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,.6);
    font-size: .8rem; font-weight: 700;
    text-decoration: none;
    transition: background .2s;
  }
  .rh-social:hover { background: var(--g); color: #fff; }
  .rh-footer-contact h3 {
    font-size: .78rem; letter-spacing: 2px; text-transform: uppercase;
    color: var(--g-mid); margin-bottom: 1.2rem; font-weight: 600;
  }
  .rh-contact-item { display: flex; align-items: flex-start; gap: .7rem; margin-bottom: .9rem; }
  .rh-contact-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--g-mid); margin-top: .45rem; flex-shrink: 0;
  }
  .rh-contact-item p { font-size: .85rem; color: rgba(255,255,255,.65); line-height: 1.5; }
  .rh-contact-item span { color: rgba(255,255,255,.9); font-weight: 600; }
  .rh-map {
    border-radius: 16px; overflow: hidden;
    height: 200px;
    border: 1px solid rgba(255,255,255,.1);
    margin-top: 1rem;
  }
  .rh-map iframe { width: 100%; height: 100%; border: 0; }
  .rh-footer-bottom {
    border-top: 1px solid rgba(255,255,255,.08);
    padding-top: 1.5rem;
    text-align: center;
    font-size: .8rem;
    color: rgba(255,255,255,.3);
    max-width: 960px;
    margin: 0 auto;
  }

  @media (max-width: 640px) {
    .rh-hero-stats { display: none; }
    .rh-footer-inner { grid-template-columns: 1fr; }
  }
`;

// ─── Motion variants (centralized, reusable) ──────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Default viewport config — animates once, triggers a bit before fully in view
const viewportOnce = { once: true, margin: "-50px" };

// ─── Sub-components ───────────────────────────────────────────────────────────

function Hero() {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.load();
  }, [current]);

  const next = () => setCurrent((c) => (c + 1) % videos.length);

  return (
    <section className="rh-hero" id="">
      <video
        ref={videoRef}
        className="rh-hero-video"
        autoPlay
        muted
        playsInline
        onEnded={next}
        key={videos[current].id}
      >
        <source src={videos[current].src} type="video/mp4" />
      </video>
      <div className="rh-hero-overlay" />
      <div className="rh-hero-pattern" />

      <div className="rh-hero-content">
        <div className="rh-eyebrow">Trusted Rentals ·Marawi City & Cagayan De Oro City</div>
        <h1>
          A home that works<br />for your <em>life</em>
        </h1>
        <p className="rh-hero-sub">{videos[current].description}</p>
        <div className="rh-hero-actions">
          <a href="#locations" className="rh-btn-primary">View locations</a>
          <a href="#about" className="rh-btn-ghost">Learn more</a>
        </div>
      </div>

      <div className="rh-hero-stats">
        <div className="rh-stat">
          <div className="rh-stat-num">50+</div>
          <div className="rh-stat-label">Cities served</div>
        </div>
        <div className="rh-stat">
          <div className="rh-stat-num">24/7</div>
          <div className="rh-stat-label">Security</div>
        </div>
        <div className="rh-stat">
          <div className="rh-stat-num">★ 4.5</div>
          <div className="rh-stat-label">Tenant rating</div>
        </div>
      </div>

      <div className="rh-hero-dots">
        {videos.map((_, i) => (
          <button
            key={i}
            className={`rh-dot${i === current ? " active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function AboutUs() {
  const cards = [
    {
      icon: "🎯",
      title: "Mission",
      text: "To provide safe, affordable, and accessible accommodations for students and employees, empowering them to live comfortably and focus on their goals.",
    },
    {
      icon: "🌟",
      title: "Vision",
      text: "To become the most trusted housing platform for students and employees across the country — offering convenience, community, and comfort at every stage of their journey.",
    },
    {
      icon: "🤝",
      title: "Values",
      text: "Reliability, convenience, and a genuine commitment to making everyday living easier and more secure for every one of our tenants.",
    },
  ];

  return (
    <section className="rh-about" id="aboutid">
      <motion.span
        className="rh-tag"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        Who we are
      </motion.span>
      <motion.h2
        className="rh-title"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        Making living simple,<br />safe, and affordable
      </motion.h2>
      <motion.p
        className="rh-lead"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        We connect students and employees with trusted, comfortable accommodations —
        conveniently located near campuses, offices, markets, and malls.
      </motion.p>
      <motion.div
        className="rh-cards"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {cards.map((c) => (
          <motion.div className="rh-card" key={c.title} variants={staggerItem}>
            <div className="rh-card-icon">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
            <div className="rh-card-accent" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Locations() {
  return (
    <section className="rh-locations" id="locations">
      <motion.span
        className="rh-tag"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        Where we are
      </motion.span>
      <motion.h2
        className="rh-title"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        Our branches
      </motion.h2>
      <motion.p
        className="rh-lead"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        We operate in two growing cities in Mindanao, with units designed for both
        working professionals and students.
      </motion.p>
      <div className="rh-loc-grid">
        <motion.div
          className="rh-loc-card"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={slideLeft}
        >
          <div className="rh-loc-badge">Marawi City</div>
          <h3>Bangon Street, Marawi Poblacion</h3>
          <p>Comfortable units walking distance from Mindanao State University and key establishments in the city center.</p>
          <div className="rh-loc-contact">📱 Smart: 0968-853-6128</div>
        </motion.div>
            <motion.div
          className="rh-loc-card"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={slideLeft}
        >
          <div className="rh-loc-badge">Marawi City</div>
          <h3>MSU_MAIN MARAWI</h3>
        <p>Quality rental accommodations situated within the Mindanao State University campus, offering a convenient and secure living environment for students and professionals.</p>
          <div className="rh-loc-contact">📱 Smart: 0968-853-6128</div>
        </motion.div>
        <motion.div
          className="rh-loc-card"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={slideRight}
        >
          <div className="rh-loc-badge">Cagayan de Oro</div>
          <h3>22nd Street Nazareth, CDO</h3>
          <p>Modern accommodations near offices, malls, and major transport routes in Misamis Oriental.</p>
          <div className="rh-loc-contact">📱 Globe: 0908-210-4510</div>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const doubled = [...testimonials, ...testimonials];
  return (
    <section className="rh-testimonials" id="testimonials">
      <motion.span
        className="rh-tag"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        Tenant stories
      </motion.span>
      <motion.h2
        className="rh-title"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        What our tenants say
      </motion.h2>
      <motion.div
        className="rh-track-wrap"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeIn}
      >
        <div className="rh-track">
          {doubled.map((t, i) => (
            <div className="rh-tcard" key={i}>
              <div className="rh-stars">★★★★★</div>
              <p>"{t.text}"</p>
              <div className="rh-tcard-footer">
                <img src={t.image} alt="Tenant" className="rh-avatar" />
                <div>
                  <div className="rh-tcard-name">Verified Tenant</div>
                  <div className="rh-tcard-role">{t.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="rh-footer" id="contactid">
      <div className="rh-footer-inner">
        <motion.div
          className="rh-footer-brand"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={slideLeft}
        >
          <h2>ANN<span>IEX</span></h2>
          <p>
            Safe, affordable, and accessible accommodations for students and
            employees across Mindanao.
          </p>
          <div className="rh-socials">
            <a href="#" className="rh-social">f</a>
            <a href="#" className="rh-social">ig</a>
            <a href="#" className="rh-social">𝕏</a>
            <a href="#" className="rh-social">in</a>
            <a href="#" className="rh-social">🌐</a>
          </div>
        </motion.div>
        <motion.div
          className="rh-footer-contact"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={slideRight}
        >
          <h3>Get in touch</h3>
          <div className="rh-contact-item">
            <div className="rh-contact-dot" />
            <p>
              <span>Marawi Branch</span><br />
              Smart · 0968-853-6128<br />
              Bangon Street, Marawi Poblacion
            </p>
          </div>
          <div className="rh-contact-item">
            <div className="rh-contact-dot" />
            <p>
              <span>CDO Branch</span><br />
              Globe · 0908-210-4510<br />
              22nd Street Nazareth, CDO
            </p>
          </div>
          <div className="rh-contact-item">
            <div className="rh-contact-dot" />
            <p>
              <span>Email</span><br />
              atmpcofficial@gmail.com
            </p>
          </div>
          <div className="rh-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1455.8424574045857!2d124.65181333438593!3d8.474524852137602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32fff2d1f8010e21%3A0xab6f2003b1593a85!2s85%2022nd%20St%2C%20Cagayan%20de%20Oro%2C%20Misamis%20Oriental!5e1!3m2!1sen!2sph!4v1747266782861!5m2!1sen!2sph"
              allowFullScreen=""
              loading="lazy"
              title="CDO Branch Location"
            />
          </div>
        </motion.div>
      </div>
      <div className="rh-footer-bottom">© 2025 ATMPC. All rights reserved.</div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function RentalServiceHomepage() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const introShown = localStorage.getItem("introShown");
    if (!introShown) setShowIntro(true);
  }, []);

  const handleIntroFinish = () => {
    localStorage.setItem("introShown", "true");
    setShowIntro(false);
  };

  // Inject scoped CSS once
  useEffect(() => {
    const id = "rh-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = css;
      document.head.appendChild(tag);
    }
    return () => {
      const tag = document.getElementById(id);
      if (tag) tag.remove();
    };
  }, []);

  return (
    <div className="rh-root">
      {showIntro && <IntroScreen onFinish={handleIntroFinish} />}
      <Hero />
      <AboutUs />
      <Locations />
      <Testimonials />
      <Footer />
    </div>
  );
}