// Module 1 & 2: JavaScript logic for symptom → specialty mapping
const symptomSpecialtyMap = {
  // Cardiology
  "chest pain": "Cardiologist",
  "shortness of breath": "Cardiologist",
  "heart palpitations": "Cardiologist",
  "irregular heartbeat": "Cardiologist",

  // Dermatology
  "skin rash": "Dermatologist",
  "acne": "Dermatologist",
  "hair loss": "Dermatologist",
  "itchy skin": "Dermatologist",

  // Neurology
  "severe headache": "Neurologist",
  "migraine": "Neurologist",
  "dizziness": "Neurologist",
  "numbness": "Neurologist",
  "seizures": "Neurologist",

  // Orthopedics
  "joint pain": "Orthopedist",
  "back pain": "Orthopedist",
  "knee pain": "Orthopedist",
  "fracture": "Orthopedist",
  "muscle pain": "Orthopedist",

  // ENT
  "ear pain": "ENT Specialist",
  "sore throat": "ENT Specialist",
  "nasal congestion": "ENT Specialist",
  "hearing loss": "ENT Specialist",
  "tonsil pain": "ENT Specialist",

  // Gastroenterology
  "stomach pain": "Gastroenterologist",
  "nausea": "Gastroenterologist",
  "vomiting": "Gastroenterologist",
  "diarrhea": "Gastroenterologist",
  "constipation": "Gastroenterologist",
  "bloating": "Gastroenterologist",

  // General Physician (default fallback)
  "fever": "General Physician",
  "cough": "General Physician",
  "cold": "General Physician",
  "fatigue": "General Physician",
  "weakness": "General Physician",
  "body ache": "General Physician",

  // Ophthalmology
  "eye pain": "Ophthalmologist",
  "blurred vision": "Ophthalmologist",
  "red eyes": "Ophthalmologist",

  // Psychiatry
  "anxiety": "Psychiatrist",
  "depression": "Psychiatrist",
  "insomnia": "Psychiatrist",
  "stress": "Psychiatrist",
};

// Function to determine specialty from symptoms (Module 1 - functions & logic)
const getSpecialtyFromSymptoms = (symptoms) => {
  if (!symptoms || symptoms.length === 0) return "General Physician";

  const specialtyCount = {};

  // Loop through symptoms and count specialty matches (Module 1 - loops)
  symptoms.forEach((symptom) => {
    const lowerSymptom = symptom.toLowerCase().trim();
    const specialty = symptomSpecialtyMap[lowerSymptom] || "General Physician";
    specialtyCount[specialty] = (specialtyCount[specialty] || 0) + 1;
  });

  // Find the most frequent specialty
  let topSpecialty = "General Physician";
  let maxCount = 0;
  Object.keys(specialtyCount).forEach((spec) => {
    if (specialtyCount[spec] > maxCount) {
      maxCount = specialtyCount[spec];
      topSpecialty = spec;
    }
  });

  return topSpecialty;
};

// GET all available symptoms
const getSymptoms = (req, res) => {
  const symptoms = Object.keys(symptomSpecialtyMap);
  res.json({
    success: true,
    count: symptoms.length,
    symptoms,
  });
};

// POST - analyze symptoms and return recommended specialty
const analyzeSymptoms = (req, res) => {
  const { symptoms } = req.body;

  // Validation (Module 1 - conditions)
  if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one symptom",
    });
  }

  const recommendedSpecialty = getSpecialtyFromSymptoms(symptoms);

  res.json({
    success: true,
    symptoms,
    recommendedSpecialty,
    message: `Based on your symptoms, we recommend seeing a ${recommendedSpecialty}`,
  });
};

module.exports = { getSymptoms, analyzeSymptoms };
