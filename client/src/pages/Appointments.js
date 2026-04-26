import React, { useState, useEffect } from "react";
import { fetchAppointments, cancelAppointment } from "../utils/api";
import { formatDate } from "../utils/validation";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => { loadAppointments(); }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const res = await fetchAppointments();
      setAppointments(res.data.appointments);
    } catch {
      setError("Failed to load appointments. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    setCancellingId(id);
    try {
      await cancelAppointment(id);
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: "cancelled" } : a))
      );
    } catch {
      alert("Failed to cancel appointment.");
    } finally {
      setCancellingId(null);
    }
  };

  const statusClass = (s) =>
    ({ confirmed: "status-confirmed", pending: "status-pending", cancelled: "status-cancelled", completed: "status-completed" }[s] || "status-pending");

  if (loading) {
    return (
      <div className="container">
        <div className="loading-center">
          <div className="spinner" />
          <p>Loading appointments…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1>My Appointments</h1>
          <p>Manage your booked appointments</p>
        </div>
        <button className="btn btn-ghost" onClick={loadAppointments} style={{ fontSize: "0.82rem" }}>
          Refresh
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {appointments.length === 0 ? (
        <div className="empty-state card">
          <span className="empty-icon">📋</span>
          <h3>No appointments yet</h3>
          <p>Book your first appointment using the symptom checker.</p>
        </div>
      ) : (
        <>
          <p style={{ color: "var(--muted)", marginBottom: "1.25rem", fontSize: "0.84rem" }}>
            <strong style={{ color: "var(--navy)" }}>{appointments.length}</strong> appointment{appointments.length !== 1 ? "s" : ""}
          </p>
          <div style={{ overflowX: "auto" }}>
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Specialty</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Symptoms</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, idx) => (
                  <tr key={appt._id}>
                    <td style={{ color: "var(--muted)", fontWeight: 500 }}>{idx + 1}</td>
                    <td>
                      <strong style={{ display: "block", color: "var(--navy)" }}>{appt.patientName}</strong>
                      <span style={{ fontSize: "0.76rem", color: "var(--muted)" }}>{appt.patientEmail}</span>
                    </td>
                    <td style={{ fontWeight: 500 }}>{appt.doctor?.name || "—"}</td>
                    <td style={{ color: "var(--muted)" }}>{appt.doctor?.specialty || "—"}</td>
                    <td>{formatDate(appt.appointmentDate)}</td>
                    <td>{appt.appointmentTime}</td>
                    <td style={{ maxWidth: "160px" }}>
                      <span style={{ fontSize: "0.76rem", color: "var(--muted)" }}>
                        {appt.symptoms?.join(", ")}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${statusClass(appt.status)}`}>
                        {appt.status}
                      </span>
                    </td>
                    <td>
                      {appt.status === "confirmed" ? (
                        <button
                          className="btn btn-danger"
                          style={{ padding: "0.3rem 0.75rem", fontSize: "0.76rem" }}
                          onClick={() => handleCancel(appt._id)}
                          disabled={cancellingId === appt._id}
                        >
                          {cancellingId === appt._id ? "…" : "Cancel"}
                        </button>
                      ) : (
                        <span style={{ color: "var(--border)", fontSize: "0.85rem" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Appointments;