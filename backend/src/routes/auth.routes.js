import express from "express";
import {
  signup,
  signin,
  logout,
  checkAuth,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", (req, res) => res.send("test Route")); // test route
// router.post("/signup", signup);
// router.post("/login", signin);
// router.post("/logout", logout);
// router.get("/check", protectRoute, checkAuth);

export default router;
