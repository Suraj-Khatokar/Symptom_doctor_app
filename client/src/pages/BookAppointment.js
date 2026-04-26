import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../components/StepIndicator";
import DoctorCard from "../components/DoctorCard";
import { fetchSymptoms, analyzeSymptoms, fetchDoctors, bookAppointment } from "../utils/api";
import { validateBookingForm, hasErrors, formatDate } from "../utils/validation";

const STEPS = ["Select Symptoms", "Choose Doctor", "Book Appointment"];

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "02:00 PM", "03:00 PM", "04:00 PM",
];

const BookAppointment = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep]         = useState(1);
  const [allSymptoms, setAllSymptoms]         = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [recommendation, setRecommendation]   = useState(null);
  const [doctors, setDoctors]                 = useState([]);
  const [selectedDoctor, setSelectedDoctor]   = useState(null);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState("");
  const [formData, setFormData]               = useState({
    patientName: "", patientEmail: "", patientPhone: "",
    patientAge: "", appointmentDate: "", appointmentTime: "", notes: "",
  });
  const [formErrors, setFormErrors]           = useState({});
  const [bookedAppointment, setBookedAppointment] = useState(null);

  useEffect(() => {
    const loadSymptoms = async () => {
      try {
        const res = await fetchSymptoms();
        setAllSymptoms(res.data.symptoms);
      } catch {
        setError("Failed to load symptoms. Make sure the server is running.");
      }
    };
    loadSymptoms();
  }, []);

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) { setError("Please select at least one symptom."); return; }
    setError(""); setLoading(true);
    try {
      const res = await analyzeSymptoms(selectedSymptoms);
      setRecommendation(res.data);
      const doctorRes = await fetchDoctors(res.data.recommendedSpecialty);
      setDoctors(doctorRes.data.doctors);
      setCurrentStep(2);
    } catch {
      setError("Analysis failed. Please try again.");
    } finally { setLoading(false); }
  };

  const handleDoctorSelect = (doctor) => { setSelectedDoctor(doctor); setError(""); };

  const handleProceedToBook = () => {
    if (!selectedDoctor) { setError("Please select a doctor to continue."); return; }
    setError(""); setCurrentStep(3);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmitBooking = async () => {
    const errors = validateBookingForm(formData);
    if (hasErrors(errors)) { setFormErrors(errors); return; }
    setError(""); setLoading(true);
    try {
      const payload = {
        ...formData,
        patientAge: Number(formData.patientAge),
        symptoms: selectedSymptoms,
        doctor: selectedDoctor._id,
      };
      const res = await bookAppointment(payload);
      setBookedAppointment(res.data.appointment);
      setCurrentStep(4);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally { setLoading(false); }
  };

  /* ── STEP 1 ── */
  const renderStep1 = () => (
    <div className="card">
      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.5rem", color: "var(--navy)", marginBottom: "0.4rem" }}>
        What are you experiencing?
      </h2>
      <p style={{ color: "var(--muted)", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
        Select all symptoms that apply — we'll find the right specialist for you.
      </p>

      {selectedSymptoms.length > 0 && (
        <div className="alert alert-info" style={{ marginBottom: "1.25rem" }}>
          <strong>{selectedSymptoms.length}</strong> symptom{selectedSymptoms.length !== 1 ? "s" : ""} selected:&nbsp;
          {selectedSymptoms.join(", ")}
        </div>
      )}

      <div className="symptom-grid">
        {allSymptoms.map((symptom) => (
          <label key={symptom} className={`symptom-checkbox ${selectedSymptoms.includes(symptom) ? "selected" : ""}`}>
            <input
              type="checkbox"
              checked={selectedSymptoms.includes(symptom)}
              onChange={() => handleSymptomToggle(symptom)}
            />
            {symptom}
          </label>
        ))}
      </div>

      {error && <div className="alert alert-error" style={{ marginTop: "1.25rem" }}>{error}</div>}

      <button
        className="btn btn-blue"
        style={{ marginTop: "1.5rem", padding: "0.75rem 2rem" }}
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? "Analyzing…" : "Analyze Symptoms →"}
      </button>
    </div>
  );

  /* ── STEP 2 ── */
  const renderStep2 = () => (
    <div>
      {recommendation && (
        <div className="recommendation-box">
          <h3>Based on your symptoms, we recommend</h3>
          <div className="specialty-badge">{recommendation.recommendedSpecialty}</div>
          <p style={{ color: "rgba(245,240,232,0.55)", fontSize: "0.8rem", marginTop: "0.5rem" }}>
            {selectedSymptoms.join(" · ")}
          </p>
        </div>
      )}

      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.35rem", color: "var(--navy)", marginBottom: "1.25rem" }}>
        Available {recommendation?.recommendedSpecialty}s
      </h2>

      {doctors.length === 0 ? (
        <div className="empty-state card">
          <span className="empty-icon">👤</span>
          <h3>No doctors found for this specialty.</h3>
          <p>Try seeding the database from the Doctors page.</p>
        </div>
      ) : (
        <div className="card-grid">
          {doctors.map((doc) => (
            <DoctorCard
              key={doc._id}
              doctor={doc}
              onSelect={handleDoctorSelect}
              selected={selectedDoctor?._id === doc._id}
            />
          ))}
        </div>
      )}

      {error && <div className="alert alert-error" style={{ margin: "1rem 0" }}>{error}</div>}

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.75rem" }}>
        <button className="btn btn-ghost" onClick={() => setCurrentStep(1)}>← Back</button>
        <button className="btn btn-blue" onClick={handleProceedToBook}>Proceed to Book →</button>
      </div>
    </div>
  );

  /* ── STEP 3 ── */
  const renderStep3 = () => (
    <div className="card">
      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.5rem", color: "var(--navy)", marginBottom: "0.25rem" }}>
        Patient Details
      </h2>
      <p style={{ color: "var(--muted)", marginBottom: "1.75rem", fontSize: "0.875rem" }}>
        Booking with <strong style={{ color: "var(--navy)" }}>{selectedDoctor?.name}</strong> — {selectedDoctor?.specialty}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.75rem" }}>
        <div className="form-group">
          <label>Full Name</label>
          <input className={`form-control ${formErrors.patientName ? "error" : ""}`} name="patientName" placeholder="e.g. Rahul Sharma" value={formData.patientName} onChange={handleInputChange} />
          {formErrors.patientName && <div className="error-msg">{formErrors.patientName}</div>}
        </div>

        <div className="form-group">
          <label>Age</label>
          <input className={`form-control ${formErrors.patientAge ? "error" : ""}`} name="patientAge" type="number" placeholder="e.g. 25" value={formData.patientAge} onChange={handleInputChange} />
          {formErrors.patientAge && <div className="error-msg">{formErrors.patientAge}</div>}
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input className={`form-control ${formErrors.patientEmail ? "error" : ""}`} name="patientEmail" type="email" placeholder="you@email.com" value={formData.patientEmail} onChange={handleInputChange} />
          {formErrors.patientEmail && <div className="error-msg">{formErrors.patientEmail}</div>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input className={`form-control ${formErrors.patientPhone ? "error" : ""}`} name="patientPhone" type="tel" placeholder="10-digit number" value={formData.patientPhone} onChange={handleInputChange} />
          {formErrors.patientPhone && <div className="error-msg">{formErrors.patientPhone}</div>}
        </div>

        <div className="form-group">
          <label>Appointment Date</label>
          <input className={`form-control ${formErrors.appointmentDate ? "error" : ""}`} name="appointmentDate" type="date" min={new Date().toISOString().split("T")[0]} value={formData.appointmentDate} onChange={handleInputChange} />
          {formErrors.appointmentDate && <div className="error-msg">{formErrors.appointmentDate}</div>}
        </div>

        <div className="form-group">
          <label>Appointment Time</label>
          <select className={`form-control ${formErrors.appointmentTime ? "error" : ""}`} name="appointmentTime" value={formData.appointmentTime} onChange={handleInputChange}>
            <option value="">— Select a time slot —</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          {formErrors.appointmentTime && <div className="error-msg">{formErrors.appointmentTime}</div>}
        </div>
      </div>

      <div className="form-group">
        <label>Additional Notes <span style={{ fontWeight: 400, color: "var(--muted)", textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
        <textarea className="form-control" name="notes" rows="3" placeholder="Any additional info for the doctor…" value={formData.notes} onChange={handleInputChange} style={{ resize: "vertical" }} />
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
        <button className="btn btn-ghost" onClick={() => setCurrentStep(2)}>← Back</button>
        <button className="btn btn-accent" onClick={handleSubmitBooking} disabled={loading}>
          {loading ? "Booking…" : "Confirm Booking →"}
        </button>
      </div>
    </div>
  );

  /* ── STEP 4: Confirmation ── */
  const renderConfirmation = () => (
    <div className="confirmation-card">
      <span className="checkmark">🎉</span>
      <h2>Appointment Confirmed</h2>
      <p style={{ color: "var(--muted)", marginBottom: "0.5rem", fontSize: "0.875rem" }}>
        Your appointment has been booked successfully.
      </p>

      <div className="confirmation-details">
        {[
          ["Patient",   bookedAppointment?.patientName],
          ["Doctor",    bookedAppointment?.doctor?.name],
          ["Specialty", bookedAppointment?.doctor?.specialty],
          ["Date",      formatDate(bookedAppointment?.appointmentDate)],
          ["Time",      bookedAppointment?.appointmentTime],
          ["Status",    bookedAppointment?.status?.toUpperCase()],
          ["Symptoms",  bookedAppointment?.symptoms?.join(", ")],
        ].map(([label, value]) => (
          <div className="detail-row" key={label}>
            <span className="detail-label">{label}</span>
            <span className="detail-value">{value}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
        <button className="btn btn-blue" onClick={() => navigate("/appointments")}>
          View All Appointments
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => {
            setCurrentStep(1);
            setSelectedSymptoms([]);
            setSelectedDoctor(null);
            setRecommendation(null);
            setFormData({ patientName: "", patientEmail: "", patientPhone: "", patientAge: "", appointmentDate: "", appointmentTime: "", notes: "" });
          }}
        >
          Book Another
        </button>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="page-header">
        <h1>Book an Appointment</h1>
        <p>Follow the steps below to find the right doctor for your symptoms</p>
      </div>

      {currentStep < 4 && <StepIndicator currentStep={currentStep} steps={STEPS} />}

      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderConfirmation()}
    </div>
  );
};

export default BookAppointment;