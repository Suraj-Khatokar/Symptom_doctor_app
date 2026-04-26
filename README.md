# 🏥 Symptom Based Doctor Appointment & Routing System
### MERN Stack Project

---

## 📌 Project Overview

A full-stack MERN application that allows patients to:
1. **Select symptoms** from a comprehensive list
2. **Get routed** to the right medical specialist automatically
3. **Browse doctors** of the recommended specialty
4. **Book an appointment** with form validation
5. **View & cancel** appointments

---

## 🧩 Module Coverage (As Per Course)

| Module | Topic | Where Used |
|--------|-------|------------|
| Module 1 | JS Basics – variables, arrays, functions, loops, conditions | `symptomController.js`, `validation.js`, filter logic |
| Module 2 | DOM & Events – event handlers, form validation | All `onChange`, `onClick` handlers in React pages |
| Module 3 | React – components, props, composition | `Navbar`, `DoctorCard`, `StepIndicator`, all pages |
| Module 4 | State, API, Express | `useState`, `useEffect`, all API calls, Express routes |
| Module 5 | MongoDB & modularization | Mongoose models, `models/`, `routes/`, `controllers/` |

---

## 🗂 Project Structure

```
symptom-doctor-app/
├── client/                    # React Frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.js      # Module 3 - reusable component
│       │   ├── DoctorCard.js  # Module 3 - props
│       │   └── StepIndicator.js
│       ├── pages/
│       │   ├── Home.js
│       │   ├── BookAppointment.js  # 3-step wizard
│       │   ├── Appointments.js
│       │   └── Doctors.js
│       ├── utils/
│       │   ├── api.js         # Module 4 - axios API layer
│       │   └── validation.js  # Module 1 - JS validation functions
│       ├── App.js             # React Router
│       └── index.css          # Global styles
│
├── server/                    # Node.js + Express Backend
│   ├── models/
│   │   ├── Doctor.js          # Module 5 - Mongoose schema
│   │   └── Appointment.js     # Module 5 - Mongoose schema
│   ├── controllers/
│   │   ├── symptomController.js   # Module 1 - routing logic
│   │   ├── doctorController.js    # Module 5 - CRUD
│   │   └── appointmentController.js
│   ├── routes/
│   │   ├── symptomRoutes.js
│   │   ├── doctorRoutes.js
│   │   └── appointmentRoutes.js
│   ├── index.js               # Express entry point
│   ├── .env.example
│   └── package.json
│
├── package.json               # Root scripts
└── README.md
```

---

## 🚀 Setup & Run Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally on port 27017, or use MongoDB Atlas)
- npm

---

### Step 1 – Clone / Extract the project

```bash
cd symptom-doctor-app
```

### Step 2 – Install dependencies

```bash
# Install root dev dependencies
npm install

# Install server and client dependencies
npm run install-all
```

### Step 3 – Configure environment

```bash
cd server
cp .env.example .env
```

Edit `.env` if needed:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/symptom_doctor_db
```

### Step 4 – Run the app

```bash
# From the root folder — starts both server and client
npm run dev
```

Or run separately:
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### Step 5 – Seed Doctors

Once the app is running:
1. Go to **Doctors** page in the browser
2. Click **"🌱 Seed Sample Doctors"**
3. This adds 9 doctors across all specialties to MongoDB

---

## 🌐 API Endpoints

### Symptoms
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/symptoms` | Get all available symptoms |
| POST | `/api/symptoms/analyze` | Analyze symptoms → get specialty |

### Doctors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | Get all doctors |
| GET | `/api/doctors?specialty=X` | Filter by specialty |
| GET | `/api/doctors/:id` | Get doctor by ID |
| POST | `/api/doctors` | Add new doctor |
| POST | `/api/doctors/seed` | Seed sample doctors |
| PUT | `/api/doctors/:id` | Update doctor |
| DELETE | `/api/doctors/:id` | Delete doctor |

### Appointments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments` | Get all appointments |
| GET | `/api/appointments/:id` | Get appointment by ID |
| POST | `/api/appointments` | Book new appointment |
| PUT | `/api/appointments/:id` | Update appointment |
| DELETE | `/api/appointments/:id` | Cancel appointment |

---

## 🩺 Symptom → Specialist Routing Logic

| Symptoms | Recommended Specialist |
|----------|----------------------|
| Chest pain, heart palpitations | Cardiologist |
| Skin rash, acne, hair loss | Dermatologist |
| Severe headache, migraine, dizziness | Neurologist |
| Joint pain, back pain, fracture | Orthopedist |
| Ear pain, sore throat, nasal congestion | ENT Specialist |
| Stomach pain, nausea, diarrhea | Gastroenterologist |
| Eye pain, blurred vision | Ophthalmologist |
| Anxiety, depression, insomnia | Psychiatrist |
| Fever, cough, fatigue, cold | General Physician |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Styling | Pure CSS (no frameworks) |

---

## 👥 Team / Submission Info

- **Project**: Symptom Based Doctor Appointment & Routing System
- **Stack**: MERN (MongoDB, Express, React, Node.js)
