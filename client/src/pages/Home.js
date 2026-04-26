import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <div className="hero-eyebrow">Symptom-Based Routing</div>
        <h1>
          Find the right doctor,<br />
          <em>every time.</em>
        </h1>
        <p>
          Tell us how you're feeling — we'll match you with the right specialist
          and get you booked in minutes.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/book")}>
          Check Symptoms & Book →
        </button>
      </div>

      {/* Features */}
      <div className="container">
        <div className="features-grid">
          {[
            {  title: "Smart Symptom Analysis", desc: "Select your symptoms and get instantly matched with the right specialist." },
            {  title: "9+ Specialists", desc: "From General Physicians to Cardiologists — all bookable in one place." },
            {  title: "Instant Booking", desc: "Pick a doctor, choose a time slot, confirm — done in 3 steps." },
            {  title: "Track Appointments", desc: "View and manage your upcoming and past appointments anytime." },
          ].map(({ icon, title, desc }) => (
            <div className="feature-card" key={title}>
              <span className="icon">{icon}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="card" style={{ marginTop: "0.5rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1.75rem" }}>
            How it works
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "1.5rem" }}>
            {[
              { num: "01",  title: "Select Symptoms", desc: "Pick from a comprehensive list of symptoms you're experiencing." },
              { num: "02",  title: "Get Matched",      desc: "Our system identifies the right specialist for your condition." },
              { num: "03",  title: "Choose a Doctor",  desc: "Browse available doctors and pick one that suits you." },
              { num: "04",  title: "Confirm Slot",     desc: "Fill in your details and confirm your appointment instantly." },
            ].map(({ num, icon, title, desc }) => (
              <div key={num} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.25rem" }}>
                  <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", color: "var(--cream-2)", lineHeight: 1, userSelect: "none" }}>{num}</span>
                  <span style={{ fontSize: "1.15rem" }}>{icon}</span>
                </div>
                <h4 style={{ fontWeight: 600, color: "var(--navy)", fontSize: "0.9rem" }}>{title}</h4>
                <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", margin: "2.5rem 0 1rem" }}>
          <button className="btn btn-blue" onClick={() => navigate("/book")} style={{ fontSize: "0.9rem", padding: "0.8rem 2.25rem" }}>
            Get Started →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;