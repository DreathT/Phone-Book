import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import globalConfig from '../configs/globalConfig.js';
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const register = catchAsyncErrors(async (req, res, next) => {
    try {
        const { email, password, username } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler('User already exists', 400));
        }

        // Create new user
        const user = new User({ username, email, password });
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            globalConfig.jwtSecret,
            { expiresIn: '1d' }
        );

        res.status(201).json({ token, user: { _id: user._id } });
    } catch (error) {
        return next(new ErrorHandler(`user couldn't registered. ${error.message}`, 400));
    }
});

export const login = catchAsyncErrors(async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Find user by email
        const user = await User.findOne({ username }).select('+password');
        if (!user) {
            return next(new ErrorHandler('Invalid credentials', 401));
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next(new ErrorHandler('Invalid credentials', 401));
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            globalConfig.jwtSecret,
            { expiresIn: '1d' }
        );

        res.status(200).json({ token, user: { _id: user._id }, success: true });
    } catch (error) {
        return next(new ErrorHandler(`user couldn't logged in. ${error.message}`, 400));
    }
});
