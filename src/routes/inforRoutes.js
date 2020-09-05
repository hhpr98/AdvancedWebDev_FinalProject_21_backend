import { Router } from "express";
import { getInforBaseOnPaymentAccount, getMyInforBaseOnJwt } from "../controllers/InformationController";

const inforRouter = Router();

// lấy infor cá nhân dựa vào jwt, k cần truy vấn nhiều bảng
inforRouter.get("/", getMyInforBaseOnJwt);
// lấy infor của 1 acc bất kì, cần nhập vào STK
inforRouter.post("/local", getInforBaseOnPaymentAccount);

export default inforRouter;