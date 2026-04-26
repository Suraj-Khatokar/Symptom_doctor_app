const express = require("express");
const router = express.Router();
const { getSymptoms, analyzeSymptoms } = require("../controllers/symptomController");

router.get("/", getSymptoms);
router.post("/analyze", analyzeSymptoms);

module.exports = router;
