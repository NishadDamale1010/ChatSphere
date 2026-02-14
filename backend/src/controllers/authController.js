const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../lib/utils");
const cloudinary = require("../lib/cloudinary");

const signup = async (req, res) => {
    const { email, fullName, password } = req.body;

    try {
        const alreadyExist = await User.findOne({ email });

        if (alreadyExist) {
            return res.status(400).json({
                success: false,
                error: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            fullName,
            password: hashedPassword
        });

        generateToken(newUser._id, res);

        res.status(201).json({
            success: true,
            user: {
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });


        if (!user) {
            return res.status(400).json({
                success: false,
                error: "Invalid email or password"
            });
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                error: "Invalid email or password"
            });
        }


        generateToken(user._id, res);

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
const updateProfile = async (req, res) => {
    try {
        const { fullName, email, password, profilePicture } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        // Update name
        if (fullName) user.fullName = fullName;

        // Update email
        if (email) {
            const emailExists = await User.findOne({ email });
            if (emailExists && emailExists._id.toString() !== user._id.toString()) {
                return res.status(400).json({
                    success: false,
                    error: "Email already in use"
                });
            }
            user.email = email;
        }

        // Update password
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Upload profile picture to Cloudinary (if provided)
        if (profilePicture) {
            const result = await cloudinary.uploader.upload(profilePicture, {
                folder: "profile_pictures",
            });
            user.profilePicture = result.secure_url;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            user: {
                _id: updatedUser._id,
                email: updatedUser.email,
                fullName: updatedUser.fullName,
                profilePicture: updatedUser.profilePicture
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }   
        res.status(200).json({
            success: true,
            user
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};




module.exports = {
    signup,
    login,
    logout,
    updateProfile,
    checkAuth

};
