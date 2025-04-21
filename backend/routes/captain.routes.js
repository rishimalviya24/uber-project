const authMiddleware = require('../middlewares/auth.middleware');
 // ✅ Make sure this path is correct
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// Make sure this path and export name is correct
const captainController = require('../controllers/captain.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type')
], captainController.registerCaptain); // ✅ This should match what's exported!

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], captainController.loginCaptain); // ✅ This should match what's exported!


router.get('/profile',authMiddleware.authCaptain, captainController.getCaptainProfile); // ✅ This should match what's exported!

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain); // ✅ This should match what's exported!    
module.exports = router;
