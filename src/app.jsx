import { useState, useEffect, useRef } from "react";

const COURSES = [
  {
    name: "Two Wheeler",
    icon: "🏍️",
    duration: "7 Days",
    sessions: "7 Sessions",
    price: "₹2,500",
    features: ["Basic balance & control", "Traffic rules", "Road practice", "License guidance"],
    color: "#e84c3d",
    popular: false,
  },
  {
    name: "Car — Basic",
    icon: "🚗",
    duration: "20 Days",
    sessions: "20 Sessions",
    price: "₹5,000",
    features: ["Steering & gear control", "City road practice", "Parking training", "Traffic navigation", "License test prep"],
    color: "#2ecc71",
    popular: true,
  },
  {
    name: "Car — Advanced",
    icon: "🚘",
    duration: "30 Days",
    sessions: "30 Sessions",
    price: "₹8,000",
    features: ["Highway driving", "Night driving", "Hill & slope practice", "Defensive driving", "License test guaranteed", "Refresher included"],
    color: "#3498db",
    popular: false,
  },
  {
    name: "Full Course",
    icon: "🎓",
    duration: "45 Days",
    sessions: "45 Sessions",
    price: "₹12,000",
    features: ["2-Wheeler + 4-Wheeler", "All terrain practice", "Highway + city + parking", "Confidence building", "License assistance", "Lifetime support"],
    color: "#f39c12",
    popular: false,
  },
];

const WHYS = [
  { icon: "🏆", title: "Experienced Trainers", desc: "Certified instructors with years of experience making you road-ready." },
  { icon: "🚗", title: "Dual-Control Cars", desc: "Learn safely with instructor-side brakes for complete safety during practice." },
  { icon: "📋", title: "License Assistance", desc: "Full support for Learning & Permanent license — RTO process made easy." },
  { icon: "⏰", title: "Flexible Timings", desc: "Morning, afternoon & evening batches. Pick what suits your schedule." },
  { icon: "🛣️", title: "Real Road Training", desc: "Practice in actual Hyderabad traffic — not just empty grounds." },
  { icon: "💰", title: "Affordable Fees", desc: "Best rates in Balapur area with no hidden charges. Pay in installments." },
];

const TESTIMONIALS = [
  { name: "Priya R.", text: "Started with zero knowledge about driving. In 20 days, I got my license on the first attempt! Best driving school in Balapur.", rating: 5 },
  { name: "Karthik M.", text: "Very patient instructor. I was scared of traffic initially but they took me step by step. Now driving confidently on highways.", rating: 5 },
  { name: "Lakshmi D.", text: "My daughter learned here. The dual-control car gave us peace of mind. Highly recommend for women learners.", rating: 5 },
  { name: "Rahul S.", text: "Affordable and professional. Got my permanent license in the first attempt. The RTO guidance was very helpful.", rating: 5 },
];

const FAQS = [
  { q: "What age do I need to be to learn driving?", a: "You must be 18 years or older for a car license (LMV). For two-wheelers without gear, the minimum age is 16 with guardian consent." },
  { q: "Do you help with the RTO license process?", a: "Yes! We guide you through the entire process — from Learning License (LL) application to Permanent License (DL) test. We also provide the vehicle for the RTO driving test." },
  { q: "Can I choose my training timings?", a: "Absolutely. We offer morning (6-9 AM), afternoon (12-3 PM), and evening (4-7 PM) batches. You can pick the slot that works best for you." },
  { q: "What type of cars do you use for training?", a: "We use dual-control Maruti cars with an instructor-side brake and clutch for your complete safety during learning." },
  { q: "What if I need extra classes beyond the course?", a: "We offer additional sessions at a discounted rate for enrolled students. We want you to be 100% confident before you drive independently." },
  { q: "Do you provide pick-up and drop facility?", a: "We provide training pick-up from select locations in the Balapur area. Please call us to confirm pick-up availability for your location." },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useInView();
  const t = { up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)", scale: "scale(0.92)" };
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : t[direction], transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s` }}>
      {children}
    </div>
  );
}

export default function SaiRohanDrivingSchool() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", course: "Car — Basic", timing: "Morning" });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  const whatsappEnquiry = () => {
    const msg = `Hi Sai Rohan Driving School! 🚗\n\nI'm interested in learning driving.\n\n👤 Name: ${form.name}\n📱 Phone: ${form.phone}\n📚 Course: ${form.course}\n⏰ Preferred Timing: ${form.timing}\n\nPlease share more details.`;
    window.open(`https://wa.me/919133999282?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const NAV = ["home", "courses", "why-us", "gallery", "reviews", "faq", "contact"];

  return (
    <div style={{ background: "#fafaf8", color: "#1a1a1a", fontFamily: "'DM Sans', system-ui, sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #e84c3d; border-radius: 2px; }

        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); } 50% { box-shadow: 0 0 0 16px rgba(37,211,102,0); } }
        @keyframes slideText { 0% { opacity:0; transform:translateY(20px); } 100% { opacity:1; transform:translateY(0); } }
        @keyframes roadLine { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }

        .btn-red { background: linear-gradient(135deg, #e84c3d, #c0392b); color: #fff; border: none; padding: 15px 36px; border-radius: 12px; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.3s; font-family: 'DM Sans', sans-serif; letter-spacing: 0.3px; }
        .btn-red:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(232,76,61,0.35); }
        .btn-white { background: #fff; color: #e84c3d; border: 2px solid #e84c3d; padding: 14px 34px; border-radius: 12px; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.3s; font-family: 'DM Sans', sans-serif; }
        .btn-white:hover { background: #e84c3d; color: #fff; }

        .field { background: #fff; border: 2px solid #eee; color: #1a1a1a; padding: 14px 18px; border-radius: 12px; font-size: 14px; font-family: 'DM Sans', sans-serif; width: 100%; outline: none; transition: border 0.3s; }
        .field:focus { border-color: #e84c3d; }
        select.field { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23e84c3d' d='M5 7L0 2h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; }

        .nav-link { color: #666; font-size: 13px; font-weight: 600; cursor: pointer; padding: 8px 14px; border-radius: 8px; transition: all 0.3s; text-transform: capitalize; }
        .nav-link:hover { color: #e84c3d; background: rgba(232,76,61,0.06); }

        .section-tag { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #e84c3d; background: rgba(232,76,61,0.06); padding: 8px 18px; border-radius: 30px; margin-bottom: 14px; }

        .wa-float { position: fixed; bottom: 24px; right: 24px; width: 60px; height: 60px; border-radius: 50%; background: #25d366; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 999; animation: pulse 2s infinite; border: none; box-shadow: 0 4px 20px rgba(37,211,102,0.35); transition: transform 0.3s; text-decoration: none; }
        .wa-float:hover { transform: scale(1.1); }

        .call-float { position: fixed; bottom: 24px; left: 24px; height: 48px; border-radius: 24px; background: #e84c3d; display: flex; align-items: center; gap: 8px; padding: 0 20px; z-index: 999; text-decoration: none; box-shadow: 0 4px 20px rgba(232,76,61,0.3); transition: all 0.3s; }
        .call-float:hover { transform: scale(1.05); }

        @media (max-width: 768px) {
          .desk-nav { display: none !important; }
          .mob-btn { display: flex !important; }
          .hero-grid { flex-direction: column !important; text-align: center !important; }
          .hero-h1 { font-size: 34px !important; }
          .sec-h2 { font-size: 28px !important; }
          .grid-4 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .footer-g { grid-template-columns: 1fr !important; text-align: center; }
          .hero-btns { justify-content: center !important; }
          .stats-r { flex-wrap: wrap !important; justify-content: center !important; }
        }
        @media (min-width: 769px) { .mob-btn { display: none !important; } .mob-nav { display: none !important; } }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: "68px",
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px",
        background: scrolled ? "rgba(250,250,248,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #eee" : "none",
        transition: "all 0.3s",
      }}>
        <div onClick={() => scrollTo("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #e84c3d, #c0392b)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "18px" }}>SR</div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 800, color: "#1a1a1a", fontFamily: "'Outfit', sans-serif" }}>SAI ROHAN</div>
            <div style={{ fontSize: "9px", fontWeight: 600, color: "#e84c3d", letterSpacing: "2px" }}>DRIVING SCHOOL</div>
          </div>
        </div>
        <div className="desk-nav" style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {NAV.map(n => <span key={n} className="nav-link" onClick={() => scrollTo(n)}>{n.replace("-", " ")}</span>)}
          <button className="btn-red" onClick={() => scrollTo("contact")} style={{ marginLeft: "14px", padding: "10px 24px", fontSize: "13px" }}>Enroll Now</button>
        </div>
        <button className="mob-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "flex", flexDirection: "column", gap: "5px", background: "none", border: "none", cursor: "pointer", padding: "8px" }}>
          <span style={{ width: "22px", height: "2px", background: "#e84c3d", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ width: "22px", height: "2px", background: "#e84c3d", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: "22px", height: "2px", background: "#e84c3d", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </nav>

      {menuOpen && (
        <div className="mob-nav" style={{ position: "fixed", inset: 0, background: "rgba(250,250,248,0.98)", zIndex: 998, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px" }}>
          {NAV.map(n => <span key={n} className="nav-link" onClick={() => scrollTo(n)} style={{ fontSize: "18px" }}>{n.replace("-", " ")}</span>)}
          <button className="btn-red" onClick={() => { scrollTo("contact"); setMenuOpen(false); }}>Enroll Now</button>
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 28px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "linear-gradient(135deg, rgba(232,76,61,0.04), rgba(232,76,61,0.08))", borderRadius: "0 0 0 40%", pointerEvents: "none" }} />
        <div className="hero-grid" style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: "50px", position: "relative" }}>
          <div style={{ flex: 1.2 }}>
            <Reveal>
              <span className="section-tag">🚗 Balapur, Hyderabad</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="hero-h1" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "50px", fontWeight: 900, lineHeight: 1.1, color: "#1a1a1a", marginBottom: "18px" }}>
                Learn to Drive<br />
                <span style={{ color: "#e84c3d" }}>with Confidence</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ color: "#777", fontSize: "16px", lineHeight: 1.8, marginBottom: "30px", maxWidth: "460px" }}>
                Complete 4-wheeler driving training with certified instructors,
                dual-control cars, real road practice, and full RTO license assistance.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="hero-btns" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button className="btn-red" onClick={() => scrollTo("contact")}>
                  Enroll Now — Start Driving
                </button>
                <a href="tel:9133999282" className="btn-white" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
                  📞 Call Us
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="stats-r" style={{ display: "flex", gap: "36px", marginTop: "44px", borderTop: "1px solid #eee", paddingTop: "28px" }}>
                {[
                  { val: "1000+", label: "Students Trained" },
                  { val: "4.8 ★", label: "Google Rating" },
                  { val: "98%", label: "Pass Rate" },
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "28px", fontWeight: 900, color: "#e84c3d" }}>{s.val}</div>
                    <div style={{ fontSize: "12px", color: "#999", fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Reveal delay={0.2} direction="scale">
              <div style={{
                width: "340px", height: "340px", borderRadius: "30px", position: "relative",
                background: "linear-gradient(135deg, #fff5f4, #ffeae8)",
                border: "1px solid rgba(232,76,61,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                animation: "float 5s ease-in-out infinite",
                boxShadow: "0 20px 60px rgba(232,76,61,0.08)",
              }}>
                <span style={{ fontSize: "120px" }}>🚗</span>
                <div style={{ position: "absolute", top: "-12px", right: "-12px", background: "#e84c3d", color: "#fff", padding: "10px 18px", borderRadius: "14px", fontSize: "13px", fontWeight: 800, boxShadow: "0 6px 20px rgba(232,76,61,0.3)" }}>
                  Since 2015
                </div>
                <div style={{ position: "absolute", bottom: "16px", left: "-16px", background: "#fff", padding: "12px 18px", borderRadius: "14px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                  <div style={{ fontSize: "11px", color: "#999" }}>Starting from</div>
                  <div style={{ fontSize: "22px", fontWeight: 900, color: "#e84c3d", fontFamily: "'Outfit', sans-serif" }}>₹2,500</div>
                </div>
                <div style={{ position: "absolute", bottom: "80px", right: "-20px", background: "#fff", padding: "10px 16px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: "#25d366", fontSize: "16px" }}>✓</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#333" }}>RTO Licensed</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" style={{ padding: "80px 28px", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal><div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="section-tag">📚 Our Courses</span>
            <h2 className="sec-h2" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "38px", fontWeight: 900, color: "#1a1a1a" }}>Choose Your <span style={{ color: "#e84c3d" }}>Driving Course</span></h2>
          </div></Reveal>
          <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {COURSES.map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{
                  background: "#fafaf8", borderRadius: "20px", padding: "28px 22px",
                  border: c.popular ? `2px solid ${c.color}` : "1px solid #eee",
                  position: "relative", height: "100%", display: "flex", flexDirection: "column",
                  transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  {c.popular && <span style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: c.color, color: "#fff", padding: "4px 16px", borderRadius: "20px", fontSize: "11px", fontWeight: 700 }}>MOST POPULAR</span>}
                  <span style={{ fontSize: "36px", marginBottom: "14px" }}>{c.icon}</span>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1a1a1a", marginBottom: "6px", fontFamily: "'Outfit', sans-serif" }}>{c.name}</h3>
                  <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
                    <span style={{ fontSize: "11px", color: "#999", background: "#f0f0f0", padding: "4px 10px", borderRadius: "6px" }}>{c.duration}</span>
                    <span style={{ fontSize: "11px", color: "#999", background: "#f0f0f0", padding: "4px 10px", borderRadius: "6px" }}>{c.sessions}</span>
                  </div>
                  <div style={{ fontSize: "32px", fontWeight: 900, color: c.color, marginBottom: "16px", fontFamily: "'Outfit', sans-serif" }}>{c.price}</div>
                  <div style={{ flex: 1 }}>
                    {c.features.map((f, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <span style={{ color: c.color, fontSize: "14px" }}>✓</span>
                        <span style={{ fontSize: "13px", color: "#555" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button className="btn-red" onClick={() => { setForm({ ...form, course: c.name }); scrollTo("contact"); }}
                    style={{ width: "100%", marginTop: "16px", background: `linear-gradient(135deg, ${c.color}, ${c.color}dd)`, padding: "12px", fontSize: "13px" }}>
                    Enroll Now
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" style={{ padding: "80px 28px", background: "#fafaf8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal><div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="section-tag">💪 Why Choose Us</span>
            <h2 className="sec-h2" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "38px", fontWeight: 900, color: "#1a1a1a" }}>Why <span style={{ color: "#e84c3d" }}>Sai Rohan</span>?</h2>
          </div></Reveal>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {WHYS.map((w, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{
                  background: "#fff", borderRadius: "18px", padding: "28px 22px",
                  border: "1px solid #eee", transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#e84c3d33"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.transform = "none"; }}
                >
                  <span style={{ fontSize: "32px", display: "block", marginBottom: "14px" }}>{w.icon}</span>
                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1a1a1a", marginBottom: "8px" }}>{w.title}</h3>
                  <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.7 }}>{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PLACEHOLDER */}
      <section id="gallery" style={{ padding: "80px 28px", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal><div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span className="section-tag">📸 Gallery</span>
            <h2 className="sec-h2" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "38px", fontWeight: 900, color: "#1a1a1a" }}>See Us <span style={{ color: "#e84c3d" }}>in Action</span></h2>
          </div></Reveal>
          <Reveal delay={0.1}>
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {["🚗 Training Car", "🛣️ Road Practice", "🏍️ Two-Wheeler", "📋 License Prep", "🎓 Certified Students", "🏆 Our Team"].map((item, i) => (
                <div key={i} style={{
                  background: "linear-gradient(135deg, #fff5f4, #ffeae8)",
                  borderRadius: "16px", height: "180px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexDirection: "column", gap: "8px",
                  border: "1px solid rgba(232,76,61,0.08)",
                }}>
                  <span style={{ fontSize: "36px" }}>{item.split(" ")[0]}</span>
                  <span style={{ fontSize: "13px", color: "#999", fontWeight: 600 }}>{item.split(" ").slice(1).join(" ")}</span>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontSize: "12px", color: "#bbb", marginTop: "14px" }}>
              * Actual photos of training sessions, cars & students will be added here
            </p>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ padding: "80px 28px", background: "#fafaf8" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Reveal><div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span className="section-tag">⭐ Reviews</span>
            <h2 className="sec-h2" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "38px", fontWeight: 900, color: "#1a1a1a" }}>What Students <span style={{ color: "#e84c3d" }}>Say</span></h2>
          </div></Reveal>
          <Reveal delay={0.1}>
            <div style={{ background: "#fff", borderRadius: "22px", padding: "36px 30px", border: "1px solid #eee", minHeight: "200px", position: "relative" }}>
              <div key={testimonialIdx} style={{ animation: "slideText 0.5s ease" }}>
                <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#f39c12", fontSize: "18px" }}>★</span>)}
                </div>
                <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.8, marginBottom: "20px", fontStyle: "italic" }}>
                  "{TESTIMONIALS[testimonialIdx].text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "linear-gradient(135deg, #e84c3d, #c0392b)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "16px" }}>
                    {TESTIMONIALS[testimonialIdx].name[0]}
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a" }}>{TESTIMONIALS[testimonialIdx].name}</div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "20px" }}>
                {TESTIMONIALS.map((_, i) => (
                  <div key={i} onClick={() => setTestimonialIdx(i)} style={{
                    width: i === testimonialIdx ? "24px" : "8px", height: "8px", borderRadius: "4px",
                    background: i === testimonialIdx ? "#e84c3d" : "#ddd", cursor: "pointer", transition: "all 0.3s",
                  }} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 28px", background: "#fff" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Reveal><div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span className="section-tag">❓ FAQ</span>
            <h2 className="sec-h2" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "38px", fontWeight: 900, color: "#1a1a1a" }}>Common <span style={{ color: "#e84c3d" }}>Questions</span></h2>
          </div></Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {FAQS.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{ background: "#fafaf8", borderRadius: "14px", border: "1px solid #eee", overflow: "hidden" }}>
                  <div onClick={() => setActiveFaq(activeFaq === i ? null : i)} style={{
                    padding: "18px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a" }}>{f.q}</span>
                    <span style={{ fontSize: "18px", color: "#e84c3d", transform: activeFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>▼</span>
                  </div>
                  {activeFaq === i && (
                    <div style={{ padding: "0 20px 18px", fontSize: "13px", color: "#777", lineHeight: 1.8, animation: "slideText 0.3s ease" }}>
                      {f.a}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / ENROLLMENT */}
      <section id="contact" style={{ padding: "80px 28px", background: "linear-gradient(135deg, #fff5f4, #fafaf8)" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Reveal><div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span className="section-tag">🎯 Enroll Now</span>
            <h2 className="sec-h2" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "38px", fontWeight: 900, color: "#1a1a1a" }}>Start Your <span style={{ color: "#e84c3d" }}>Driving Journey</span></h2>
            <p style={{ color: "#999", fontSize: "14px", marginTop: "8px" }}>Fill in your details and we'll confirm your batch via WhatsApp</p>
          </div></Reveal>
          <Reveal delay={0.1}>
            <div style={{ background: "#fff", borderRadius: "22px", padding: "36px 28px", border: "1px solid #eee", boxShadow: "0 8px 32px rgba(0,0,0,0.04)" }}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "12px", color: "#999", fontWeight: 600, display: "block", marginBottom: "6px" }}>YOUR NAME</label>
                <input className="field" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "12px", color: "#999", fontWeight: 600, display: "block", marginBottom: "6px" }}>PHONE NUMBER</label>
                <input className="field" type="tel" placeholder="WhatsApp number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "#999", fontWeight: 600, display: "block", marginBottom: "6px" }}>COURSE</label>
                  <select className="field" value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}>
                    {COURSES.map(c => <option key={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "#999", fontWeight: 600, display: "block", marginBottom: "6px" }}>PREFERRED TIMING</label>
                  <select className="field" value={form.timing} onChange={e => setForm({ ...form, timing: e.target.value })}>
                    <option>Morning (6-9 AM)</option>
                    <option>Afternoon (12-3 PM)</option>
                    <option>Evening (4-7 PM)</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
                <button className="btn-red" onClick={whatsappEnquiry} style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", minWidth: "200px" }}>
                  💬 Enroll via WhatsApp
                </button>
                <a href="tel:9133999282" className="btn-white" style={{ flex: 1, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", minWidth: "140px" }}>
                  📞 Call Now
                </a>
              </div>
            </div>
          </Reveal>

          {/* Contact cards */}
          <Reveal delay={0.2}>
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginTop: "24px" }}>
              {[
                { icon: "📞", label: "Call", value: "9133 999 282", link: "tel:9133999282" },
                { icon: "📞", label: "Call 2", value: "9866 902 354", link: "tel:9866902354" },
                { icon: "📍", label: "Location", value: "Balapur, Hyderabad", link: "https://maps.google.com/?q=Sai+Rohan+Motor+Driving+School+Balapur+Hyderabad" },
              ].map((c, i) => (
                <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" style={{
                  background: "#fff", borderRadius: "14px", padding: "18px 14px",
                  border: "1px solid #eee", textAlign: "center", textDecoration: "none",
                  transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#e84c3d33"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.transform = "none"; }}
                >
                  <span style={{ fontSize: "24px", display: "block", marginBottom: "8px" }}>{c.icon}</span>
                  <div style={{ fontSize: "11px", color: "#bbb", marginBottom: "2px" }}>{c.label}</div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a" }}>{c.value}</div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "48px 28px 24px", background: "#1a1a1a", color: "#fff" }}>
        <div className="footer-g" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "40px", marginBottom: "32px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#e84c3d", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "14px" }}>SR</div>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "16px", fontWeight: 800 }}>SAI ROHAN DRIVING SCHOOL</span>
            </div>
            <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.8, maxWidth: "300px" }}>
              A complete 4-wheeler driving training school in Balapur, Hyderabad. Learn from certified instructors with dual-control cars and full license assistance.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 700, color: "#e84c3d", letterSpacing: "1px", marginBottom: "14px" }}>QUICK LINKS</h4>
            {["Home", "Courses", "Why Us", "Gallery", "Reviews", "FAQ", "Contact"].map(l => (
              <div key={l} style={{ marginBottom: "8px" }}>
                <span onClick={() => scrollTo(l.toLowerCase().replace(" ", "-"))} style={{ fontSize: "13px", color: "#777", cursor: "pointer" }}
                  onMouseEnter={e => e.target.style.color = "#e84c3d"} onMouseLeave={e => e.target.style.color = "#777"}>{l}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 700, color: "#e84c3d", letterSpacing: "1px", marginBottom: "14px" }}>CONTACT</h4>
            <div style={{ fontSize: "13px", color: "#777", lineHeight: 2.2 }}>
              <div>📞 9133 999 282</div>
              <div>📞 9866 902 354</div>
              <div>📍 Balapur, Hyderabad</div>
              <div>📸 @sairohandrivingschool</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #333", paddingTop: "18px", textAlign: "center", fontSize: "11px", color: "#555" }}>
          © {new Date().getFullYear()} Sai Rohan Motor Driving School, Balapur, Hyderabad. All rights reserved.
        </div>
      </footer>

      {/* FLOATING */}
      <a href="https://wa.me/919133999282?text=Hi!%20I%20want%20to%20learn%20driving.%20Please%20share%20course%20details." target="_blank" rel="noopener noreferrer" className="wa-float">
        <span style={{ fontSize: "28px" }}>💬</span>
      </a>
      <a href="tel:9133999282" className="call-float">
        <span style={{ fontSize: "16px" }}>📞</span>
        <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700 }}>Call Now</span>
      </a>
    </div>
  );
}
