import { Router } from "express";
import customerRoutes from "./customerRoutes";
import employeeRoutes from "./employeeRouter";
import paymentRoutes from "./paymentRouter";
import partnerRouter from "./partnerBankingRoute"
import rsaRouter from "./rsaRoute"
import AuthMiddleWare from "../middleware/AuthMiddleware";
import receiverRoutes from "./receiverRouter";
import otpRouter from "./emailOTP";
import authRouter from "./authentication";
import debtRouter from "./debtReminderRoutes";
import forgotPasswordRouter from "./forgotPasswordRouter";
import inforRouter from "./inforRoutes";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/rsa", rsaRouter);
apiRouter.use("/forgot", forgotPasswordRouter);

apiRouter.use(AuthMiddleWare.isAuth);

apiRouter.use("/partner", partnerRouter);
apiRouter.use("/customers", customerRoutes);
apiRouter.use("/employees", employeeRoutes);
apiRouter.use("/OTP", otpRouter);
apiRouter.use("/payments", paymentRoutes);
apiRouter.use("/receivers", receiverRoutes);
apiRouter.use("/debt-reminders", debtRouter);
apiRouter.use("/infor", inforRouter);

export default apiRouter;