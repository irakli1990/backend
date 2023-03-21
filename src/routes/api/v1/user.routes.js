import { Router } from "express";
import { usersController } from "../../../controllers/users.controller";

const router = Router();

/**
 * @typedef User
 * @property {string} _id -  id of user record
 * @property {string} email - email of user
 * @property {string} password - password of user
 * @property {string} role - role of user
 */
/**
 * This function comment is parsed by doctrine
 * @route GET /users
 * @group Users - list users
 * @returns {Array<User>} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get("/", usersController.get_users);

export const userRoutes = router;
