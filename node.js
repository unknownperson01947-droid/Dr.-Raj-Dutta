const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Init data file
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ appointments: [], subscribers: [], messages: [] }, null, 2));
}

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ─── ROUTES ───────────────────────────────────────────────────────────────────

// Book appointment
app.post('/api/appointments', (req, res) => {
  const { name, phone, email, date, time, reason } = req.body;
  if (!name || !phone || !date || !time) {
    return res.status(400).json({ success: false, message: 'Name, phone, date, and time are required.' });
  }
  const data = readData();
  const appointment = {
    id: Date.now(),
    name,
    phone,
    email: email || '',
    date,
    time,
    reason: reason || '',
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  data.appointments.push(appointment);
  writeData(data);
  res.json({ success: true, message: 'Appointment booked successfully!', appointment });
});

// Get all appointments (admin)
app.get('/api/appointments', (req, res) => {
  const data = readData();
  res.json({ success: true, appointments: data.appointments });
});

// Subscribe to newsletter
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email required.' });
  }
  const data = readData();
  if (data.subscribers.includes(email)) {
    return res.json({ success: true, message: 'You are already subscribed!' });
  }
  data.subscribers.push(email);
  writeData(data);
  res.json({ success: true, message: 'Subscribed successfully!' });
});

// Contact message
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ success: false, message: 'Name and message are required.' });
  }
  const data = readData();
  data.messages.push({ id: Date.now(), name, email, phone, message, createdAt: new Date().toISOString() });
  writeData(data);
  res.json({ success: true, message: 'Message sent! We will get back to you soon.' });
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Dr. Raj Dutta website running at http://localhost:${PORT}`);
});