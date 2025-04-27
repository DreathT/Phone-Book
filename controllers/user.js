import User from "../models/user.js"
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req?.params?.id });
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
        res.status(200).json({
            succes: true,
            data: user
        });
    } catch (error) {
        return next(new ErrorHandler("User not found", 404));
    }
});

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
    try {
        const user = req?.user;
        if (!user) {
            return next(new ErrorHandler("No user found", 404));
        }
        res.status(200).json({
            succes: true,
            data: user.users
        });
    } catch (error) {
        return next(new ErrorHandler("Users not found", 404));
    }
});

export const createUser = catchAsyncErrors(async (req, res, next) => {
    try {
        const { name, lastname, phoneNumber } = req.body;

        const user = await User.findById(req.user._id);
        for (const user of req.user.users) {
            if (user.phoneNumber === phoneNumber) {
                return next(new ErrorHandler("this number is exist ", 401));
            }
        }
        const newUser = {
            name,
            lastname,
            phoneNumber
        };
        user.users.push(newUser);
        await user.save();
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        return next(new ErrorHandler("User not found", 404));
    }
});

export const updateUser = catchAsyncErrors(async (req, res, next) => {
    try {
        const { name, lastname, phoneNumber } = req.body;
        const user = await User.findById(req.user._id);
        console.log("user", user);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
        const phoneBookUser = req?.params?.id
        console.log("phoneBookUser", phoneBookUser);
        if (user.users.length === 0) {
            return next(new ErrorHandler("No user found", 404));
        }

        for (let i = 0; i < user.users.length; i++) {
            if (user.users[i]._id.toString() === phoneBookUser) {
                user.users[i].name = name;
                user.users[i].lastname = lastname;
                user.users[i].phoneNumber = phoneNumber;
                break;
            }
        }
        await user.save();
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return next(new ErrorHandler("User not found", 404));
    }
});


export const deleteUser = catchAsyncErrors(async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req?.user });
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
        const phoneBookUser = req?.params?.id

        if (user.users.length === 0) {
            return next(new ErrorHandler("No user found", 404));
        }

        for (let i = 0; i < user.users.length; i++) {
            if (user.users[i]._id.toString() === phoneBookUser) {
                user.users.splice(i, 1);
                break;
            }
        }
        await user.save();

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        return next(new ErrorHandler(`User not found ${error}`, 404));
    }
});