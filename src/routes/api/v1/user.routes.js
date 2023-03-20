import { Router } from "express";
import { usersController } from "../../../controllers/users.controller";

const router = Router();

router.get("/", usersController.get_users);

router.post("/", usersController.save_user);

export const userRoutes = router;
