import { Router } from "express";
import { authController } from "../../../controllers/auth.controller";
import { User } from "../../../models/user.model";

const router = Router();

/**
 * @typedef Login
 * @property {string} email.required - Some description for product
 * @property {string} password.required - Some description for product
 */
/**
 * This function comment is parsed by doctrine
 * @route POST /auth/login
 * @group Auth - login register user
 * @param {Login.model} user.body.required - the login body
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post("/login", authController.login);

/**
 * @typedef User
 * @property {string} email.required - Some description for product
 * @property {string} password.required - Some description for product
 */
/**
 * This function comment is parsed by doctrine
 * @route POST /auth/register
 * @group Auth - login register user
 * @param {User.model} user.body.required - the register body
 * @returns {object} 201 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post("/register", authController.register);

export const authRoutes = router;
