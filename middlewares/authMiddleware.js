import jwt from 'jsonwebtoken';
import User from '../models/user.js';

//authorization control
export const isAuthenticatedUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            _id: decoded.id
        });

        if (!user) {
            throw new ErrorHandler('user not found', 404);
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};


export const isAdmin = async (req, res, next) => {
    try {
        if (!req.user || !req.user.role) {
            res.status(403).send({ success: false, message: "Access denied. No role information provided." });
        }
        if (req.user.role !== 'admin') {
            res.status(403).send({ success: false, message: "Access denied. Admins only." });
        }
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};