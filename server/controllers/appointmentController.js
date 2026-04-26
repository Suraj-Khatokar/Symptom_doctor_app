const Appointment = require("../models/Appointment");

// GET all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "name specialty phone email")
      .sort({ createdAt: -1 });
    res.json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// GET single appointment
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "doctor",
      "name specialty phone email availableSlots"
    );
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// POST book a new appointment
const bookAppointment = async (req, res) => {
  try {
    const { patientName, patientEmail, patientPhone, patientAge, symptoms, doctor, appointmentDate, appointmentTime, notes } = req.body;

    // Validation (Module 1 - conditions & validation)
    if (!patientName || !patientEmail || !patientPhone || !patientAge || !symptoms || !doctor || !appointmentDate || !appointmentTime) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Check for existing appointment at same slot
    const existing = await Appointment.findOne({ doctor, appointmentDate, appointmentTime, status: { $ne: "cancelled" } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This time slot is already booked. Please choose another.",
      });
    }

    const appointment = await Appointment.create({
      patientName, patientEmail, patientPhone, patientAge,
      symptoms, doctor, appointmentDate, appointmentTime,
      notes: notes || "",
    });

    const populated = await appointment.populate("doctor", "name specialty phone email");

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully!",
      appointment: populated,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Booking failed", error: error.message });
  }
};

// PUT update appointment status
const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("doctor", "name specialty");

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.json({ success: true, message: "Appointment updated", appointment });
  } catch (error) {
    res.status(400).json({ success: false, message: "Update failed", error: error.message });
  }
};

// DELETE cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.json({ success: true, message: "Appointment cancelled successfully", appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = { getAppointments, getAppointmentById, bookAppointment, updateAppointment, cancelAppointment };
