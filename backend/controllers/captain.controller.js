const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model.js');

const captainService = require('../services/captain.service.js');
const BlacklistToken = require('../models/blacklistToken.model.js');

module.exports.registerCaptain = async (req, res ,next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;

    const isCaptionAlreadyExist = await captainModel.findOne({ email });

    if (isCaptionAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist' });
    }
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });
    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });

}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await captain.comparePassword(password);

    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = await captain.generateAuthToken();
    // console.log('token', token);

    res.status(200).json({ token, captain });

}

module.exports.getCaptainProfile = async (req, res, next) => {
    console.log(req.captain);
    res.status(200).json({ captain : req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log(token);

    await BlacklistToken.create({ token });
    
    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successful' });
}   