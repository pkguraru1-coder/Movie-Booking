# 🎬 MovieBooking — Quick Setup Guide

## Sirf 4 Steps!

---

## Step 1: MongoDB URI Set Karo

`backend/.env` file open karo:

### Option A — Local MongoDB (recommended for beginners)
```
MONGO_URI=mongodb://127.0.0.1:27017/bookmovie
```
Pehle MongoDB install karo: https://www.mongodb.com/try/download/community
Phir service start karo:
- Windows: `net start MongoDB`  
- Mac: `brew services start mongodb-community`

### Option B — MongoDB Atlas (free cloud, no install needed)
1. https://cloud.mongodb.com pe account banao
2. Free cluster create karo
3. Connection string copy karo, .env mein paste karo:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bookmovie
```

---

## Step 2: VS Code mein 3 Terminals kholo

### Terminal 1 — Backend
```bash
cd backend
npm install
npm start
```
✅ Dekho: `DB Connected` aur `Server running at http://localhost:5000`

### Terminal 2 — Frontend
```bash
cd frontend
npm install
npm run dev
```
✅ Browser: http://localhost:5173

### Terminal 3 — Admin
```bash
cd admin
npm install
npm run dev
```
✅ Browser: http://localhost:5174

---

## Step 3: Admin User Banao

1. http://localhost:5173/signup pe register karo
2. MongoDB shell mein role update karo:
```bash
mongosh
use bookmovie
db.users.updateOne({ email: "tumhara@email.com" }, { $set: { role: "admin" } })
```

---

## Step 4: Done! 🎉

| App | URL |
|-----|-----|
| Frontend (User) | http://localhost:5173 |
| Admin Panel | http://localhost:5174 |
| Backend API | http://localhost:5000 |

---

## Common Errors & Fix

| Error | Fix |
|-------|-----|
| `MONGO_URI is not set` | `.env` file mein MONGO_URI daalo |
| `ECONNREFUSED 127.0.0.1:27017` | MongoDB service start karo |
| `CORS error` | Backend chal raha hai? Port 5000 check karo |
| `Module not found` | `npm install` dobara run karo |
| `Port 5000 already in use` | `npx kill-port 5000` run karo |
