const userModel = require("../models/user.model.js");
const captainModel = require("../models/captain.model.js");
const blacklistTokenModel = require("../models/blacklistToken.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token: token});
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    const user = await userModel.findById(decoded.id);
    req.user = user;

    return next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log("Token:", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token: token});
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded JWT:", decoded.id);
    const captain = await captainModel.findById(decoded.id);
    console.log("Captain:", captain);
    req.captain = captain;

    return next();
  } catch {
    return res.status(404).json({ message: "Unauthorized" });
  }
}