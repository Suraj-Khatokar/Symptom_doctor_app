import React from "react";

const DoctorCard = ({ doctor, onSelect, selected }) => {
  return (
    <div className={`doctor-card ${selected ? "selected-card" : ""}`}>
      <div className="doctor-avatar">👤</div>

      <h3>{doctor.name}</h3>
      <span className="specialty">{doctor.specialty}</span>

      <div className="info-row">
        <span>★ <span className="rating">{doctor.rating}</span></span>
        <span style={{ color: "#9ca3af" }}>·</span>
        <span>{doctor.experience} yrs exp</span>
      </div>

      <div className="info-row" style={{ marginTop: "0.3rem" }}>
        <span>{doctor.phone}</span>
      </div>

      {onSelect && (
        <button
          className={`btn ${selected ? "btn-success" : "btn-blue"}`}
          style={{ marginTop: "1.1rem", width: "100%", justifyContent: "center" }}
          onClick={() => onSelect(doctor)}
        >
          {selected ? "✓ Selected" : "Select Doctor"}
        </button>
      )}
    </div>
  );
};

export default DoctorCard;