import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import movieRouter from './routes/movieRouter.js';
import userRouter from './routes/userRouter.js';
import bookingRouter from './routes/bookingRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// ── uploads folder auto-create ────────────────────────────
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// ── CORS — frontend & admin dono allow ───────────────────
app.use(cors({
  origin: [
    'http://localhost:5173',  // frontend
    'http://localhost:5174',  // admin
    'http://localhost:3000',
  ],
  credentials: true,
}));

// ── Body parsers ──────────────────────────────────────────
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ── Static uploads ────────────────────────────────────────
app.use('/uploads', express.static(uploadsDir));

// ── DB Connect ────────────────────────────────────────────
connectDB();

// ── Routes ────────────────────────────────────────────────
app.use('/api/auth',     userRouter);
app.use('/api/movies',   movieRouter);
app.use('/api/bookings', bookingRouter);

// ── Health check ──────────────────────────────────────────
app.get('/', (_req, res) => res.json({ message: '🎬 BookMovie API running!' }));

// ── Global error handler ──────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err.message);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Server error' });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
