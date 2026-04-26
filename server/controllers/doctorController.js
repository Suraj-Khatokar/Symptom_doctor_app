const Doctor = require("../models/Doctor");

// GET all doctors (optionally filter by specialty)
const getDoctors = async (req, res) => {
  try {
    const { specialty } = req.query;
    const filter = specialty ? { specialty } : {};
    const doctors = await Doctor.find(filter).sort({ rating: -1 });
    res.json({ success: true, count: doctors.length, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// GET single doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    res.json({ success: true, doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// POST create a new doctor
const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, message: "Doctor created successfully", doctor });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }
    res.status(400).json({ success: false, message: "Validation error", error: error.message });
  }
};

// PUT update doctor
const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    res.json({ success: true, message: "Doctor updated successfully", doctor });
  } catch (error) {
    res.status(400).json({ success: false, message: "Update failed", error: error.message });
  }
};

// DELETE doctor
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    res.json({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// POST seed initial doctors
const seedDoctors = async (req, res) => {
  try {
    await Doctor.deleteMany({});
    const doctors = [
      { name: "Dr. Arjun Sharma", specialty: "General Physician", email: "arjun.sharma@hospital.com", phone: "9876543210", experience: 10, rating: 4.8 },
      { name: "Dr. Priya Nair", specialty: "Cardiologist", email: "priya.nair@hospital.com", phone: "9876543211", experience: 15, rating: 4.9 },
      { name: "Dr. Ravi Menon", specialty: "Dermatologist", email: "ravi.menon@hospital.com", phone: "9876543212", experience: 8, rating: 4.6 },
      { name: "Dr. Sneha Patel", specialty: "Neurologist", email: "sneha.patel@hospital.com", phone: "9876543213", experience: 12, rating: 4.7 },
      { name: "Dr. Kiran Reddy", specialty: "Orthopedist", email: "kiran.reddy@hospital.com", phone: "9876543214", experience: 11, rating: 4.5 },
      { name: "Dr. Meena Iyer", specialty: "ENT Specialist", email: "meena.iyer@hospital.com", phone: "9876543215", experience: 9, rating: 4.4 },
      { name: "Dr. Suresh Kumar", specialty: "Gastroenterologist", email: "suresh.kumar@hospital.com", phone: "9876543216", experience: 13, rating: 4.8 },
      { name: "Dr. Ananya Bose", specialty: "Ophthalmologist", email: "ananya.bose@hospital.com", phone: "9876543217", experience: 7, rating: 4.6 },
      { name: "Dr. Rahul Gupta", specialty: "Psychiatrist", email: "rahul.gupta@hospital.com", phone: "9876543218", experience: 14, rating: 4.9 },
    ];
    const created = await Doctor.insertMany(doctors);
    res.json({ success: true, message: `${created.length} doctors seeded successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: "Seeding failed", error: error.message });
  }
};

module.exports = { getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor, seedDoctors };
