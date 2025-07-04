// routes/careRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../database');

// Get all users
router.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Submit new feedback
router.post('/feedback', async (req, res) => {
    const { user_id, message } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO feedback (user_id, message) VALUES (?, ?)',
            [user_id, message]
        );
        res.status(201).json({ id: result.insertId, user_id, message });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all feedback
router.get('/feedback', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT f.*, u.name 
            FROM feedback f
            JOIN users u ON f.user_id = u.id
            ORDER BY created_at DESC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Submit new support ticket
router.post('/tickets', async (req, res) => {
    const { user_id, title, description } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO support_tickets (user_id, title, description) VALUES (?, ?, ?)',
            [user_id, title, description]
        );
        res.status(201).json({ id: result.insertId, title, description });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all support tickets
router.get('/tickets', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT t.*, u.name 
            FROM support_tickets t
            JOIN users u ON t.user_id = u.id
            ORDER BY created_at DESC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update ticket status
router.put('/tickets/:id/status', async (req, res) => {
    const { status } = req.body;
    try {
        await pool.query('UPDATE support_tickets SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;