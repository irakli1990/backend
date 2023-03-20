import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.json({ status: true, message: "login" });
});

export const authRoutes = router;
