# HealFusion Frontend - Backend API Integration Checklist

## 🔐 Authentication Endpoints Required

### POST /api/auth/register
**Purpose**: User registration  
**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "user|doctor"
}
```
**Response**: `{ token, user: { _id, name, email, role } }`

### POST /api/auth/login
**Purpose**: User login  
**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Response**: `{ token, user: { _id, name, email, role } }`

---

## 👥 User Management Endpoints

### GET /api/user/profile
**Purpose**: Get logged-in user profile  
**Response**: `{ _id, name, email, age, gender, phone, role, createdAt }`

### PUT /api/user/profile
**Purpose**: Update user profile  
**Request Body**: `{ name, age, gender, phone }`  
**Response**: Updated user object

---

## 👨‍⚕️ Doctor Endpoints

### GET /api/doctors
**Purpose**: Get all doctors  
**Response**: 
```json
[{
  "_id": "string",
  "name": "string",
  "email": "string",
  "specialization": "string",
  "experience": "number",
  "consultationFee": "number",
  "rating": "number",
  "phone": "string"
}]
```

### GET /api/doctor/profile
**Purpose**: Get logged-in doctor's profile  
**Response**: Doctor object with additional fields

### PUT /api/doctor/profile
**Purpose**: Update doctor profile  
**Request Body**: `{ specialization, experience, consultationFee }`

---

## 🏥 Consultation / Appointment Endpoints

### GET /api/consultations
**Purpose**: Get user's consultations  
**Response**:
```json
[{
  "_id": "string",
  "patientId": { "name": "string", ... },
  "doctorId": { "name": "string", "specialization": "string", ... },
  "date": "ISO date",
  "status": "pending|confirmed|completed|rejected",
  "notes": "string"
}]
```

### GET /api/consultations/doctor
**Purpose**: Get doctor's appointment requests  
**Response**: Array of consultation objects (doctor view)

### POST /api/consultations/request
**Purpose**: Create appointment request  
**Request Body**: `{ doctorId, notes: "optional" }`  
**Response**: Created consultation object

### PUT /api/consultations/:id
**Purpose**: Update consultation status  
**Request Body**: `{ status: "confirmed|rejected|completed" }`  
**Response**: Updated consultation object

---

## 🩺 Symptom Analysis Endpoints

### POST /api/symptoms/analyze
**Purpose**: Analyze symptoms and predict disease  
**Request Body**: `{ symptoms: "string description" }`  
**Response**:
```json
{
  "disease": "string",
  "severity": "low|medium|high",
  "confidence": "number (0-100)",
  "causes": ["string"],
  "symptoms": ["string"],
  "preventive": ["string"],
  "remedies": ["string"],
  "recommendation": "string"
}
```

---

## 📚 Medical History Endpoints

### GET /api/medical-history
**Purpose**: Get user's medical history  
**Response**:
```json
[{
  "_id": "string",
  "userId": "string",
  "condition": "string",
  "date": "ISO date",
  "medicines": "string",
  "notes": "string",
  "doctorId": "optional ObjectId"
}]
```

### POST /api/medical-history/add
**Purpose**: Add medical history entry  
**Request Body**: `{ condition, date, medicines, notes }`  
**Response**: Created record object

---

## 📖 Articles Endpoints

### GET /api/articles
**Purpose**: Get all health articles  
**Response**:
```json
[{
  "_id": "string",
  "title": "string",
  "category": "string",
  "excerpt": "string",
  "content": "string",
  "emoji": "string",
  "date": "ISO date"
}]
```

---

## 📞 Contact Endpoints

### POST /api/contact/send
**Purpose**: Send contact form message  
**Request Body**: `{ name, email, subject, message, category }`  
**Response**: `{ success: true, message: "Email sent successfully" }`

---

## ⚙️ Admin Endpoints

### GET /api/admin/stats
**Purpose**: Get platform statistics  
**Response**: `{ totalUsers: number, totalDoctors: number, totalConsultations: number }`

### GET /api/admin/users
**Purpose**: Get all users (admin only)  
**Response**: Array of user objects

### GET /api/admin/doctors
**Purpose**: Get all doctors (admin only)  
**Response**: Array of doctor objects

### DELETE /api/admin/users/:id
**Purpose**: Delete user  
**Response**: `{ success: true }`

### GET /api/admin/diseases
**Purpose**: Get all diseases in database  
**Response**:
```json
[{
  "_id": "string",
  "name": "string",
  "description": "string",
  "severity": "low|medium|high",
  "createdAt": "ISO date"
}]
```

### POST /api/admin/diseases
**Purpose**: Add new disease  
**Request Body**: `{ name, description, severity }`  
**Response**: Created disease object

---

## 🔄 Error Handling

All endpoints should return:
- **Success (200)**: Data object or `{ success: true }`
- **Bad Request (400)**: `{ message: "error description" }`
- **Unauthorized (401)**: `{ message: "Unauthorized" }`
- **Forbidden (403)**: `{ message: "Access denied" }`
- **Not Found (404)**: `{ message: "Resource not found" }`
- **Server Error (500)**: `{ message: "Server error" }`

---

## 🔒 Authentication

All protected endpoints (except /api/auth/register, /api/auth/login) require:
- **Header**: `Authorization: Bearer <token>`
- User context should be extracted from token on backend

---

## 📝 Data Models Required

### User Model
```
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/doctor/admin),
  age: Number,
  gender: String,
  phone: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Doctor Model
```
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  specialization: String,
  experience: Number,
  consultationFee: Number,
  rating: Number,
  phone: String,
  createdAt: Date
}
```

### Consultation Model
```
{
  _id: ObjectId,
  patientId: ObjectId,
  doctorId: ObjectId,
  date: Date,
  status: String (pending/confirmed/completed/rejected),
  notes: String,
  createdAt: Date
}
```

### Medical History Model
```
{
  _id: ObjectId,
  userId: ObjectId,
  condition: String,
  date: Date,
  medicines: String,
  notes: String,
  doctorId: ObjectId (optional),
  createdAt: Date
}
```

### Disease Model
```
{
  _id: ObjectId,
  name: String,
  description: String,
  severity: String (low/medium/high),
  createdAt: Date
}
```

---

## ✅ Frontend Ready Status

- ✅ All 12 pages implemented
- ✅ All forms with validation ready
- ✅ Navigation and routing configured
- ✅ Error handling framework in place
- ✅ Loading states implemented
- ✅ Responsive design complete
- ✅ API calls structure in place

**Next Steps**: 
1. Implement backend endpoints
2. Update API calls with actual backend URLs
3. Test all functionality end-to-end
4. Deploy to production

---

## 🌐 Environment Configuration

Create `.env` file in frontend root:
```
VITE_API_URL=http://localhost:5000/api
```

Then update fetch calls:
```javascript
const API_URL = import.meta.env.VITE_API_URL || '/api'
```

---

## 🚀 Deployment Checklist

- [ ] Backend APIs implemented and tested
- [ ] Database configured (MongoDB with Neon)
- [ ] Frontend environment variables set
- [ ] CORS configured on backend
- [ ] Authentication tokens working
- [ ] All pages tested end-to-end
- [ ] Error handling verified
- [ ] Responsive design verified on devices
- [ ] Performance optimizations applied
- [ ] Security measures implemented (password hashing, JWT, etc.)
- [ ] Deployed to production

---

**Note**: The frontend is production-ready! Just need the backend endpoints to be fully functional.
