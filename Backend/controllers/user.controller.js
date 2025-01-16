import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utillis/datauri.js";
import cloudinary from "../utillis/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false,
            });
        }

        let profilePhotoUrl = null;

        if (req.file) {
            const fileUri = getDataUri(req.file);
            const uploadResult = await cloudinary.uploader.upload(fileUri.content);
            profilePhotoUrl = uploadResult.secure_url;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: { profilePhoto: profilePhotoUrl },
        });

        res.status(201).json({
            message: "Account created successfully.",
            success: true,
            userId: newUser._id,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({
            message: "An error occurred during registration.",
            success: false,
            error: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with the current role.",
                success: false,
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

        res
            .status(200)
            .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" })
            .json({
                message: `Welcome back, ${user.fullname}`,
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    profile: user.profile,
                },
                success: true,
            });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            message: "An error occurred during login.",
            success: false,
            error: error.message,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const userId = req.id; // Extracted from middleware
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;

        if (skills) {
            user.profile.skills = skills.split(",");
        }

        if (req.file) {
            const fileUri = getDataUri(req.file);
            const uploadResult = await cloudinary.uploader.upload(fileUri.content);
            user.profile.resume = uploadResult.secure_url;
            user.profile.resumeOriginalName = req.file.originalname;
        }

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true,
        });
    } catch (error) {
        console.error("Error during profile update:", error);
        res.status(500).json({
            message: "An error occurred during profile update.",
            success: false,
            error: error.message,
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token").status(200).json({
            message: "Logged out successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({
            message: "An error occurred during logout.",
            success: false,
            error: error.message,
        });
    }
};
