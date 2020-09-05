import { Router } from "express";
import { sendOTP, verifyCode, createNewPassword } from "../controllers/forgotPasswordController";

const forgotPasswordRouter = Router();

forgotPasswordRouter.post("/send", sendOTP);
forgotPasswordRouter.post("/verify", verifyCode);
forgotPasswordRouter.post("/change", createNewPassword);


export default forgotPasswordRouter;