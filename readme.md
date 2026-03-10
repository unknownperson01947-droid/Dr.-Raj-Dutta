# Dr. Raj Dutta — Medical Practice Website

A full-stack redesign of rajduttamed.com — professional, modern, and fully functional.

---

## 📁 Project Structure

```
drrajdutta/
├── server.js          ← Node.js/Express backend
├── package.json       ← Dependencies
├── data.json          ← Auto-generated: stores appointments, subscribers, messages
└── public/
    └── index.html     ← Full frontend (HTML/CSS/JS)
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the server
```bash
npm start
# or for development with auto-reload:
npm run dev
```

### 3. Open in browser
```
http://localhost:3000
```

---

## 🔌 API Endpoints

| Method | Route                 | Description              |
|--------|-----------------------|--------------------------|
| POST   | `/api/appointments`   | Book a new appointment   |
| GET    | `/api/appointments`   | List all appointments    |
| POST   | `/api/subscribe`      | Subscribe to newsletter  |
| POST   | `/api/contact`        | Send a contact message   |

### Book Appointment (POST /api/appointments)
```json
{
  "name": "John Doe",
  "phone": "+91 9876543210",
  "email": "john@example.com",
  "date": "2025-04-10",
  "time": "02:00 PM",
  "reason": "Diabetes consultation"
}
```

### Subscribe (POST /api/subscribe)
```json
{ "email": "user@example.com" }
```

---

## 🎨 Features

- **Responsive** — mobile-first, works on all screen sizes
- **Animated** — scroll reveal, count-up stats, hero animations
- **Booking Form** — saves appointments to data.json
- **Newsletter** — email subscription system
- **Clinic Hours** — today's day highlighted automatically
- **Dark luxury theme** — deep navy + gold palette
- **Typography** — Cormorant Garamond + Outfit fonts

---

## 🌐 Deployment

### Render / Railway / Heroku
Set `PORT` environment variable. The app serves static files from `/public`.

### Vercel / Netlify (frontend only)
Deploy the `/public/index.html` directly and point API calls to your backend URL.