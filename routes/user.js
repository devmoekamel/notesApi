import { Router } from "express";
import { register, login } from "../controllers/users.js";
const router = Router();
// user / create user

router.route("/register").post(register);
router.route("/login").post(login);

export default router;
