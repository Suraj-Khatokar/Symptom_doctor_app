# MediRoute: Symptom-Based Doctor Appointment & Routing System

A full-stack MERN application that intelligently routes patients to appropriate medical specialists based on their symptoms and enables seamless appointment booking.

## 🎯 Project Overview

MediRoute addresses the common problem of patients not knowing which medical specialist to consult for their symptoms. The application provides:

- **Smart Symptom Analysis**: Analyzes patient symptoms and recommends the appropriate medical specialty
- **Doctor Discovery**: Browse and filter doctors by specialty with detailed profiles
- **Appointment Management**: Book, view, and cancel appointments with form validation
- **Responsive Interface**: Clean, intuitive UI built with modern React practices

## 🏗 Architecture

### Frontend (React)
- **Component-Based Design**: Reusable, modular React components (Navbar, DoctorCard, StepIndicator)
- **State Management**: Efficient state handling with React hooks (useState, useEffect)
- **API Integration**: Axios-based API layer for clean backend communication
- **Routing**: React Router v6 for multi-page navigation
- **Form Validation**: Client-side validation ensuring data integrity

### Backend (Node.js + Express)
- **RESTful API**: Structured routes following MVC architecture
- **Database Models**: Mongoose schemas for Doctor and Appointment entities
- **Business Logic**: Symptom-to-specialty routing algorithm in controllers
- **Error Handling**: Proper validation and error responses

### Database (MongoDB)
- **Collections**: Doctor profiles and appointment records
- **Schema Design**: Normalized structures with proper relationships
- **Seeding**: Sample data for testing and demonstration

## 📋 Course Module Coverage

| Module | Topic | Implementation |
|--------|-------|-----------------|
| **Module 1** | JavaScript Fundamentals | Validation logic, symptom-to-specialty routing algorithm |
| **Module 2** | DOM & Events | Form handlers, event listeners, interactive form validation |
| **Module 3** | React Components | DoctorCard, StepIndicator, Navbar (composition & props) |
| **Module 4** | State & APIs | useState/useEffect hooks, Axios API integration, Express routes |
| **Module 5** | Database & Architecture | Mongoose schemas, modular route/controller structure |

## 🗂 Project Structure

```
symptom-doctor-app/
├── client/                              # React Frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.js               # Navigation component
│       │   ├── DoctorCard.js           # Doctor display card
│       │   └── StepIndicator.js        # Appointment wizard steps
│       ├── pages/
│       │   ├── Home.js                 # Landing page
│       │   ├── BookAppointment.js      # 3-step booking wizard
│       │   ├── Appointments.js         # View & cancel appointments
│       │   └── Doctors.js              # Doctor listing & search
│       ├── utils/
│       │   ├── api.js                  # Axios API client
│       │   └── validation.js           # Form validation utilities
│       ├── App.js                      # Router configuration
│       └── index.css                   # Global styles
│
├── server/                              # Node.js + Express Backend
│   ├── models/
│   │   ├── Doctor.js                   # Doctor schema
│   │   └── Appointment.js              # Appointment schema
│   ├── controllers/
│   │   ├── symptomController.js        # Symptom routing logic
│   │   ├── doctorController.js         # Doctor CRUD operations
│   │   └── appointmentController.js    # Appointment management
│   ├── routes/
│   │   ├── symptomRoutes.js            # Symptom endpoints
│   │   ├── doctorRoutes.js             # Doctor endpoints
│   │   └── appointmentRoutes.js        # Appointment endpoints
│   ├── index.js                        # Express server entry point
│   ├── .env.example                    # Environment configuration template
│   └── package.json
│
├── package.json                         # Root configuration
└── README.md
```

## 🩺 Symptom-to-Specialty Mapping

The system uses a predefined symptom database to route patients:

| Symptoms | Recommended Specialty |
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

## 🔌 API Endpoints

### Symptoms
- `GET /api/symptoms` - Retrieve all available symptoms
- `POST /api/symptoms/analyze` - Analyze symptoms and return recommended specialty

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors?specialty=X` - Filter doctors by specialty
- `GET /api/doctors/:id` - Get doctor details
- `POST /api/doctors` - Add new doctor (admin)
- `PUT /api/doctors/:id` - Update doctor information
- `DELETE /api/doctors/:id` - Remove doctor record
- `POST /api/doctors/seed` - Populate database with sample doctors

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get specific appointment
- `POST /api/appointments` - Book new appointment
- `PUT /api/appointments/:id` - Update appointment details
- `DELETE /api/appointments/:id` - Cancel appointment

## 🛠 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, React Router v6, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Styling** | Pure CSS (custom design, no frameworks) |

## ✨ Key Features

- **Smart Routing Algorithm**: Matches patient symptoms to appropriate specialties
- **Doctor Filtering**: Search and filter doctors by specialty
- **3-Step Appointment Wizard**: Intuitive multi-step booking process
- **Input Validation**: Comprehensive form validation on client and server
- **Appointment Management**: View booked appointments and cancel when needed
- **Sample Data Seeding**: Pre-populated doctors for demonstration
- **Responsive Design**: Works across different screen sizes

## 📝 Notes

- The application includes comprehensive form validation at both frontend and backend levels
- Sample doctors are seeded via the UI for demonstration purposes
- The symptom-to-specialty mapping is rule-based and can be extended
- Pure CSS is used for styling to demonstrate CSS proficiency without framework dependencies

---

**Project Type**: Academic MERN Stack Application  
**Course**: BCS304 - Data Structures & Applications
