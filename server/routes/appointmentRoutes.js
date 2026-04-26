const express = require("express");
const router = express.Router();
const { getAppointments, getAppointmentById, bookAppointment, updateAppointment, cancelAppointment } = require("../controllers/appointmentController");

router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.post("/", bookAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", cancelAppointment);

module.exports = router;
