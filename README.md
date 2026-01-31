# HealFusion

HealFusion is a prototype full-stack AI-powered medical assistant platform.

# HealFusion

HealFusion is a full-stack AI-powered medical assistant web platform that integrates symptom analysis, disease prediction, treatment guidance, multilingual voice interaction, and doctor consultation into a single secure system.

## Features

- **Symptom Analysis**: Input symptoms via text or voice (Web Speech API) and get AI-powered insights
- **Disease Prediction**: Receive predictions with severity levels, causes, preventive measures, and home remedies
- **Doctor Recommendations**: Smart matching engine suggests suitable doctors based on specialization
- **Medical History**: Secure tracking of health records and past consultations
- **Consultation Management**: Schedule and manage doctor consultations
- **Voice Interaction**: Multilingual speech-to-text and text-to-speech support
- **Role-Based Access**: Dedicated user, doctor, and admin panels
- **Secure Authentication**: JWT-based auth with password hashing

## Tech Stack

- **Frontend**: React 18 + Vite + Axios
- **Backend**: Node.js + Express + Mongoose + MongoDB
- **Authentication**: JWT + bcrypt
- **Voice**: Web Speech API
- **Database**: MongoDB (in-memory for dev via `mongodb-memory-server`)

## Quick Start

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Start Servers

Open two terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

### 3. Access the App

Open http://localhost:5173 in your browser.

## Seeding Data (One-Time Setup)

To populate sample diseases and doctors:

```bash
cd backend
npm run seed:all
```

### Test Credentials

After seeding, you can log in with:
- **Email**: `alice@example.com`, `bob@example.com`, or `carol@example.com`
- **Password**: `password`

## Environment Variables

Create a `.env` in the `backend/` directory (optional, uses in-memory DB by default):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/healfusion
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## Project Structure

```
healfusion/
├── backend/
│   ├── routes/           # API routes
│   ├── models/           # Mongoose schemas
│   ├── middleware/       # Auth & validation
│   ├── scripts/          # Seed scripts
│   ├── server.js         # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   ├── contexts/     # Auth context
│   │   ├── styles.css    # Global styles
│   │   └── main.jsx      # Entry point
│   └── package.json
└── README.md
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User
- `GET /api/user/me` - Get current user profile (protected)

### Symptoms
- `POST /api/symptoms/parse` - Parse symptoms and predict diseases (protected)

### Recommendations
- `POST /api/recommendations` - Get doctor recommendations (protected)

### Medical History
- `GET /api/medical-history` - Get user's medical history (protected)
- `POST /api/medical-history/entry` - Add medical history entry (protected)

### Consultations
- `POST /api/consultations` - Create consultation request (protected)
- `GET /api/consultations` - Get user's consultations (protected)
- `PATCH /api/consultations/:id` - Update consultation status (doctor only)

### Doctors
- `GET /api/doctors` - List all doctors (protected)
- `GET /api/doctors/:id` - Get doctor profile (protected)

### Admin
- `GET /api/admin` - Get all users (admin only)
- `PATCH /api/admin/:id/role` - Update user role (admin only)

## Security & Privacy

✅ **Password Security**: All passwords are hashed with bcrypt
✅ **JWT Authentication**: Secure token-based auth with role-based access control
✅ **Input Validation**: Email format, password strength, required fields
✅ **CORS Enabled**: Frontend-backend communication secured
✅ **Protected Routes**: All sensitive endpoints require authentication
✅ **No Data Storage**: Seed data resets with each dev session

## Important Disclaimer

**⚠️ CRITICAL:** HealFusion is an **AI-assisted tool that DOES NOT replace professional medical advice**. It is designed to:
- Provide preliminary symptom analysis
- Suggest information and general guidance
- Connect users with qualified healthcare professionals

**Always consult a qualified doctor for diagnosis, treatment, and medical advice.**

HealFusion developers are not liable for any misuse or reliance on AI predictions without professional medical consultation.

## Development Notes

- The frontend automatically proxies API requests to `http://localhost:5000`
- Web Speech API works best in Chrome, Edge, and Safari
- For production, replace in-memory MongoDB with a real MongoDB instance
- Update `JWT_SECRET` and `MONGO_URI` for production deployment

## Future Enhancements

- Real-time doctor chat/video consultation
- Advanced NLP with LLM integration (GPT, etc.)
- Multi-language support
- Appointment calendar integration
- Medical document uploads
- Insurance integration

---

**Built with ❤️ for accessible healthcare assistance.**
