<div align="center">

# 🧬 HealFusion

### AI-Powered Healthcare Assistant Platform

*Symptom analysis · Disease prediction · Doctor consultation · Medical records*

[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

> ⚠️ **Medical Disclaimer:** HealFusion is an AI-assisted informational tool and **does not replace professional medical advice**. Always consult a qualified healthcare professional for diagnosis and treatment.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [Seeding Sample Data](#-seeding-sample-data)
- [API Reference](#-api-reference)
- [Roles & Access Control](#-roles--access-control)
- [Security](#-security)
- [Recent Improvements](#-recent-improvements)
- [Future Enhancements](#-future-enhancements)

---

## 🌟 Overview

HealFusion is a full-stack MERN web platform that combines AI-powered symptom analysis with real doctor consultation management. Users can describe symptoms via text or voice, receive disease predictions with severity ratings, browse and consult doctors, and maintain a complete digital medical history — all behind a secure JWT-authenticated system with role-based access control.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🩺 **AI Symptom Analysis** | Input symptoms via text or voice and receive disease predictions with confidence scores |
| 📊 **Disease Prediction** | Severity levels (Low / Medium / High), causes, home remedies, and preventive measures |
| 👨‍⚕️ **Doctor Directory** | Browse doctors by specialization with ratings and availability |
| 📅 **Consultation Management** | Schedule and track consultations; doctors can accept/reject/update status |
| 🗂️ **Medical History** | Persistent health records with entries tied to each user |
| 📄 **Medical Reports** | Upload and manage personal health documents |
| 💊 **Medicine Lookup** | Browse medicines with descriptions and usage info |
| 📝 **Prescriptions** | Doctors can create and manage patient prescriptions |
| 🎙️ **Voice Input** | Multilingual speech-to-text via Web Speech API (Chrome/Edge/Safari) |
| 🔐 **Role-Based Panels** | Separate dashboards for users, doctors, and admins |
| 📰 **Health Articles** | Curated healthcare articles and wellness content |
| 📧 **Contact System** | Built-in contact form for user inquiries |

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2 | UI framework |
| Vite | 4.x | Build tool & dev server |
| React Router DOM | 6.x | Client-side routing |
| Axios | 1.4 | HTTP client |
| MUI (Material UI) | 7.x | UI components & icons |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js + Express | 4.18 | REST API server |
| Mongoose | 7.x | MongoDB ODM |
| MongoDB | — | Primary database |
| mongodb-memory-server | 9.x | In-memory DB for dev |
| bcrypt | 5.x | Password hashing |
| jsonwebtoken | 9.x | JWT auth tokens |
| express-rate-limit | 8.x | Auth brute-force protection |
| express-validator | 7.x | Input validation |

---

## 📁 Project Structure

```
HealFusion/
├── backend/
│   ├── middleware/
│   │   ├── auth.js             # JWT verification middleware
│   │   └── validation.js       # Input validation rules
│   ├── models/
│   │   ├── User.js             # User schema (name, email, role)
│   │   ├── Disease.js          # Disease & symptom mappings
│   │   ├── Doctor.js           # Doctor profile schema
│   │   ├── Consultation.js     # Consultation request schema
│   │   ├── MedicalHistory.js   # Patient health records
│   │   ├── MedicalReport.js    # Uploaded report metadata
│   │   ├── Medicine.js         # Medicine catalog
│   │   └── Prescription.js     # Doctor-issued prescriptions
│   ├── routes/
│   │   ├── auth.js             # POST /register, POST /login
│   │   ├── user.js             # GET /me
│   │   ├── symptoms.js         # POST /parse (AI diagnosis)
│   │   ├── recommendations.js  # POST / (doctor matching)
│   │   ├── doctors.js          # GET / , GET /:id
│   │   ├── doctor.js           # Doctor-specific actions
│   │   ├── consultations.js    # CRUD consultation requests
│   │   ├── medicalHistory.js   # GET, POST history entries
│   │   ├── medicalReports.js   # Report management
│   │   ├── medicines.js        # Medicine catalog CRUD
│   │   ├── prescriptions.js    # Prescription management
│   │   ├── admin.js            # Admin user management
│   │   └── contact.js          # Contact form handler
│   ├── scripts/
│   │   ├── seedDiseases.js     # Seeds disease & symptom data
│   │   └── seedDoctors.js      # Seeds sample doctor accounts
│   ├── .env.example            # Environment variable template
│   ├── server.js               # App entry point
│   └── package.json
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── ErrorBoundary.jsx   # Global error recovery UI
│       │   ├── Footer.jsx          # Site footer
│       │   └── ProtectedRoute.jsx  # Auth guard wrapper
│       ├── contexts/
│       │   └── AuthContext.jsx     # Global auth state & token mgmt
│       ├── pages/
│       │   ├── Home.jsx            # Landing page
│       │   ├── Login.jsx           # Login form
│       │   ├── Register.jsx        # Registration form
│       │   ├── Symptoms.jsx        # AI symptom diagnosis
│       │   ├── Medicine.jsx        # Medicine browser
│       │   ├── VideoConsultation.jsx  # Video call interface
│       │   ├── MedicalReports.jsx  # Report management
│       │   ├── MedicalHistory.jsx  # Health history timeline
│       │   ├── Consultations.jsx   # Doctor consultation booking
│       │   ├── UserPanel.jsx       # Patient dashboard
│       │   ├── DoctorPanel.jsx     # Doctor dashboard
│       │   ├── AdminPanel.jsx      # Admin control panel
│       │   ├── Articles.jsx        # Health articles
│       │   ├── Contact.jsx         # Contact form
│       │   └── About.jsx           # About page
│       ├── App.jsx                 # Root component + routing
│       ├── main.jsx                # React entry point
│       └── styles.css              # Global design system (~4400 lines)
│
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v16+ and **npm** v8+
- **MongoDB** (optional — falls back to in-memory if not configured)

### 1. Clone & Install

```bash
git clone https://github.com/your-username/HealFusion.git
cd HealFusion

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Configure Environment

```bash
cd backend
cp .env.example .env
# Edit .env and set your values (see Environment Variables section)
```

### 3. Start the Development Servers

Open **two separate terminals**:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# → http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# → http://localhost:5173
```

### 4. Open the App

Navigate to **http://localhost:5173** in your browser.

---

## 🔐 Environment Variables

Create `backend/.env` based on `backend/.env.example`:

```env
# Server
PORT=5000

# Database (omit for in-memory dev mode)
MONGO_URI=mongodb://localhost:27017/healfusion

# JWT — use a long, random string in production
JWT_SECRET=your_super_secret_key_here

# CORS — set to your frontend URL in production
FRONTEND_URL=http://localhost:5173
```

> **Note:** If `MONGO_URI` is omitted, the server automatically uses an in-memory MongoDB instance (data resets on each restart). Ideal for development and demos.

---

## 🌱 Seeding Sample Data

Populate the database with diseases, symptoms, and sample doctors:

```bash
cd backend

# Seed everything at once
npm run seed:all

# Or individually
npm run seed:diseases
npm run seed:doctors
```

### Test Accounts (after seeding)

| Role | Email | Password |
|------|-------|----------|
| Patient | `alice@example.com` | `password` |
| Patient | `bob@example.com` | `password` |
| Patient | `carol@example.com` | `password` |

> To create a **doctor** or **admin** account, register normally then update the role via the Admin Panel.

---

## 📡 API Reference

All protected routes require the header: `Authorization: Bearer <token>`

### 🔑 Auth — `/api/auth`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | Public | Register new user |
| POST | `/login` | Public | Login and receive JWT |

> Auth endpoints are rate-limited to **10 requests per 15 minutes** per IP.

### 👤 User — `/api/user`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/me` | 🔒 User | Get current user profile |

### 🩺 Symptoms — `/api/symptoms`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/parse` | 🔒 User | Parse symptoms and return disease predictions |

### 💡 Recommendations — `/api/recommendations`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | 🔒 User | Match doctors based on predicted disease |

### 👨‍⚕️ Doctors — `/api/doctors`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | 🔒 User | List all doctors |
| GET | `/:id` | 🔒 User | Get specific doctor profile |

### 📅 Consultations — `/api/consultations`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | 🔒 User | Create consultation request |
| GET | `/` | 🔒 User | Get user's consultations |
| PATCH | `/:id` | 🔒 Doctor | Update consultation status |

### 🗂️ Medical History — `/api/medical-history`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | 🔒 User | Retrieve all history entries |
| POST | `/entry` | 🔒 User | Add a new history entry |

### 📄 Medical Reports — `/api/medical-reports`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | 🔒 User | List user's reports |
| POST | `/` | 🔒 User | Upload a new report |
| DELETE | `/:id` | 🔒 User | Delete a report |

### 💊 Medicines — `/api/medicines`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | 🔒 User | Browse medicine catalog |

### 📝 Prescriptions — `/api/prescriptions`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | 🔒 User/Doctor | Get prescriptions |
| POST | `/` | 🔒 Doctor | Create prescription |

### 🛡️ Admin — `/api/admin`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | 🔒 Admin | List all users |
| PATCH | `/:id/role` | 🔒 Admin | Change user role |

### 📧 Contact — `/api/contact`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | Public | Submit contact form |

---

## 👥 Roles & Access Control

| Role | Panel | Capabilities |
|------|-------|-------------|
| **User (Patient)** | User Panel | Symptom diagnosis, book consultations, view medical history & reports, browse medicines |
| **Doctor** | Doctor Panel | Manage consultations, create prescriptions, view patient records |
| **Admin** | Admin Panel | View all users, change roles, system-wide oversight |

---

## 🔒 Security

| Measure | Implementation |
|---------|----------------|
| ✅ Password hashing | bcrypt (salt rounds: 10) |
| ✅ JWT authentication | 7-day expiry, signed with `JWT_SECRET` |
| ✅ Role-based access | Middleware enforces role on every protected route |
| ✅ Input validation | `express-validator` on all user inputs |
| ✅ Rate limiting | 10 auth attempts / 15 min per IP |
| ✅ CORS restriction | Configurable via `FRONTEND_URL` env var |
| ✅ Error boundary | Frontend catches render errors gracefully |

---

## 📈 Recent Improvements *(v0.1 → current)*

- **Code splitting** — All 15 pages lazy-loaded via `React.lazy()` + `Suspense`; initial JS bundle reduced from **615 KB → 54 KB**
- **Vendor chunks** — React/Router and MUI separated into independently cacheable chunks
- **Error Boundary** — Global crash recovery UI instead of blank white screen
- **CORS hardened** — Replaced wildcard `cors()` with explicit origin allowlist
- **CSS syntax fix** — Removed orphaned rule that was generating build warnings
- **Duplicate keyframe** — Renamed conflicting `@keyframes pulse` to `micPulse`
- **Dead route removed** — Eliminated duplicate `/consultations` route
- **Backend cleanup** — Removed 10 leftover test/debug files

---

## 🔮 Future Enhancements

- [ ] Real-time doctor chat via WebSockets
- [ ] LLM integration (GPT/Gemini) for advanced NLP symptom parsing
- [ ] Multi-language UI (i18n)
- [ ] Appointment calendar with reminders
- [ ] Medical document OCR & analysis
- [ ] Progressive Web App (PWA) support
- [ ] Insurance provider integration
- [ ] Dark mode toggle

---

## 🌐 Browser Support

| Feature | Chrome | Edge | Firefox | Safari |
|---------|--------|------|---------|--------|
| Core App | ✅ | ✅ | ✅ | ✅ |
| Voice Input (Web Speech API) | ✅ | ✅ | ⚠️ Limited | ✅ |
| Video Consultation | ✅ | ✅ | ✅ | ✅ |

---

## 📜 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with ❤️ for accessible, AI-assisted healthcare.**

*HealFusion is not a medical device. Always seek professional medical advice.*

</div>
