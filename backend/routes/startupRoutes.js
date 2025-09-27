const express = require('express');
const router = express.Router();
const { createStartup, getFeedForAdopter } = require('../controller/startupController');
const { isLoggedIn, isFounder, isAdopter } = require('../middleware/auth');
const {getFeedbackForStartup}=require("../controller/startupController")


// Test route (no auth required)
router.get('/test', (req, res) => {
    res.json({ message: 'Startup routes working!' });
});

// Test POST route (no auth required) - for testing
router.post('/test', (req, res) => {
    res.json({ 
        message: 'POST route working!', 
        body: req.body,
        received: true 
    });
}); 

// Simple route without auth for testing

// Sirf logged-in founder hi startup create kar sakta hai
router.post('/', isLoggedIn, isFounder, createStartup);
// Adopter apni personalized feed dekh sakta hai
router.get('/', isLoggedIn, isAdopter, getFeedForAdopter);

// Debug route to check if GET / is working
router.get('/debug', (req, res) => {
    res.json({ message: 'GET /debug route working!' });
});

// Ek startup ke saare feedback dekhne ke liye
router.get('/:startupId/feedback', isLoggedIn, isFounder, getFeedbackForStartup);

module.exports = router;
