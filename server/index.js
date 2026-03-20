import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database Setup
const dbPath = path.resolve(__dirname, 'analytics.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS clicks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            link_text TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

// API Routes

// Track a click
app.post('/api/track', (req, res) => {
    const { url, text } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const sql = `INSERT INTO clicks (url, link_text) VALUES (?, ?)`;
    db.run(sql, [url, text], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Click tracked', id: this.lastID });
    });
});

// Get analytics stats
app.get('/api/stats', (req, res) => {
    const sql = `
        SELECT url, link_text, COUNT(*) as count 
        FROM clicks 
        GROUP BY url, link_text 
        ORDER BY count DESC
    `;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
