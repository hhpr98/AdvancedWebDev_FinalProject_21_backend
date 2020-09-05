import { Router } from "express";
import { sendOTP, verifyOTP } from "../controllers/OTPController";

const otpRouter = Router();

// Dành cho customer tự xác nhận giao dịch của cá nhân (transaction chuyển tiền & thanh toán nhắc nợ, còn forgot password đã có riêng)
otpRouter.post("/send", sendOTP);
otpRouter.post("/verify", verifyOTP);

export default otpRouter;