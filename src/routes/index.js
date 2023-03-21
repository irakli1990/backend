import { Router } from "express";
import { authRoutes } from "./api/v1/auth.routes";
import { userRoutes } from "./api/v1/user.routes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { config } from "../config/config";

export const router = Router();

router.get("/", async (req, res) => {
  res.json({ status: true, message: "Our node.js app works" });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

// router.use("/api-docs", swaggerUi.serve);
// router.get("/api-docs", swaggerUi.setup(swaggerJsdoc(config.swaggerOptions)));

export const appRoutes = router;
