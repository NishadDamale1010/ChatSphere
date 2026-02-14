const express = require('express');
const router = require('express').Router();
const protectRoute = require("../middlewares/authmiddleware");
const { updateProfile, } = require("../controllers/authController");
const {login,signup,logout,checkAuth} =require('../controllers/authController')
router.post('/login',login);
router.post('/signup',signup);
router.post('/logout',logout);
router.put("/update-profile",protectRoute,updateProfile);
router.get("/check-auth",protectRoute,checkAuth);   

module.exports = router;