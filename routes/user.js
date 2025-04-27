import express from 'express';
import { getUserDetails, getAllUsers, deleteUser, createUser, updateUser } from '../controllers/user.js';
import { isAuthenticatedUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/users').get(isAuthenticatedUser, getAllUsers);
router.route('/user/:id').get(isAuthenticatedUser, getUserDetails);
router.route('/user/create').post(isAuthenticatedUser, createUser);
router.route('/user/update/:id').put(isAuthenticatedUser, updateUser);
router.route('/user/delete/:id').delete(isAuthenticatedUser, deleteUser);

export default router;