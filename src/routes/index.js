import { Router } from "express";
import { authRoutes } from "./api/v1/auth.routes";
import { userRoutes } from "./api/v1/user.routes";

export const router = Router();

router.get("/", async (req, res) => {
  res.json({ status: true, message: "Our node.js app works" });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export const appRoutes = router;
