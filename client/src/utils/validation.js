// Module 1: JavaScript functions & conditions for form validation

// Validate email format
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validate phone number (10 digits)
export const validatePhone = (phone) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
};

// Validate appointment booking form
export const validateBookingForm = (formData) => {
  const errors = {};

  if (!formData.patientName || formData.patientName.trim().length < 3) {
    errors.patientName = "Name must be at least 3 characters";
  }

  if (!formData.patientEmail || !validateEmail(formData.patientEmail)) {
    errors.patientEmail = "Please enter a valid email address";
  }

  if (!formData.patientPhone || !validatePhone(formData.patientPhone)) {
    errors.patientPhone = "Please enter a valid 10-digit phone number";
  }

  if (!formData.patientAge || formData.patientAge < 1 || formData.patientAge > 120) {
    errors.patientAge = "Please enter a valid age (1-120)";
  }

  if (!formData.appointmentDate) {
    errors.appointmentDate = "Please select an appointment date";
  } else {
    // Check date is not in the past
    const today = new Date().toISOString().split("T")[0];
    if (formData.appointmentDate < today) {
      errors.appointmentDate = "Appointment date cannot be in the past";
    }
  }

  if (!formData.appointmentTime) {
    errors.appointmentTime = "Please select an appointment time";
  }

  return errors;
};

// Check if form has any errors
export const hasErrors = (errors) => Object.keys(errors).length > 0;

// Format date to readable string
export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", options);
};
