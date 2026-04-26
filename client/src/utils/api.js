import axios from "axios";

// Module 4: API utility - centralised axios instance
const API = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

// ===== Symptom APIs =====
export const fetchSymptoms = () => API.get("/symptoms");
export const analyzeSymptoms = (symptoms) => API.post("/symptoms/analyze", { symptoms });

// ===== Doctor APIs =====
export const fetchDoctors = (specialty = "") =>
  API.get(`/doctors${specialty ? `?specialty=${specialty}` : ""}`);
export const fetchDoctorById = (id) => API.get(`/doctors/${id}`);
export const seedDoctors = () => API.post("/doctors/seed");

// ===== Appointment APIs =====
export const fetchAppointments = () => API.get("/appointments");
export const fetchAppointmentById = (id) => API.get(`/appointments/${id}`);
export const bookAppointment = (data) => API.post("/appointments", data);
export const cancelAppointment = (id) => API.delete(`/appointments/${id}`);

export default API;
