import React, { useState, useEffect } from "react";
import DoctorCard from "../components/DoctorCard";
import { fetchDoctors, seedDoctors } from "../utils/api";

const SPECIALTIES = [
  "All", "General Physician", "Cardiologist", "Dermatologist",
  "Neurologist", "Orthopedist", "ENT Specialist",
  "Gastroenterologist", "Ophthalmologist", "Psychiatrist",
];

const Doctors = () => {
  const [doctors, setDoctors]               = useState([]);
  const [filtered, setFiltered]             = useState([]);
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [loading, setLoading]               = useState(true);
  const [seeding, setSeeding]               = useState(false);
  const [error, setError]                   = useState("");
  const [successMsg, setSuccessMsg]         = useState("");

  useEffect(() => { loadDoctors(); }, []);

  useEffect(() => {
    setFiltered(
      activeSpecialty === "All"
        ? doctors
        : doctors.filter((d) => d.specialty === activeSpecialty)
    );
  }, [activeSpecialty, doctors]);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetchDoctors();
      setDoctors(res.data.doctors);
    } catch {
      setError("Failed to load doctors.");
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    if (!window.confirm("This will reset and re-seed all doctors. Continue?")) return;
    setSeeding(true);
    try {
      await seedDoctors();
      setSuccessMsg("9 doctors seeded successfully.");
      setTimeout(() => setSuccessMsg(""), 3000);
      loadDoctors();
    } catch {
      setError("Seeding failed.");
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-center">
          <div className="spinner" />
          <p>Loading doctors…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1>Our Doctors</h1>
          <p>Browse specialists available for appointment</p>
        </div>
        <button className="btn btn-ghost" onClick={handleSeed} disabled={seeding}>
          {seeding ? "Seeding…" : "Seed Sample Doctors"}
        </button>
      </div>

      {error      && <div className="alert alert-error">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      {/* Specialty filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
        {SPECIALTIES.map((spec) => (
          <button
            key={spec}
            className={`filter-pill ${activeSpecialty === spec ? "active" : ""}`}
            onClick={() => setActiveSpecialty(spec)}
          >
            {spec}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state card">
          <span className="empty-icon">👤</span>
          <h3>No doctors found</h3>
          <p>Click "Seed Sample Doctors" to populate the database.</p>
        </div>
      ) : (
        <>
          <p style={{ color: "var(--muted)", marginBottom: "1.25rem", fontSize: "0.84rem" }}>
            Showing <strong style={{ color: "var(--navy)" }}>{filtered.length}</strong> doctor{filtered.length !== 1 ? "s" : ""}
            {activeSpecialty !== "All" && ` — ${activeSpecialty}`}
          </p>
          <div className="card-grid">
            {filtered.map((doc) => (
              <DoctorCard key={doc._id} doctor={doc} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Doctors;