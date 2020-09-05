import { Router } from "express";
import { createNewSaveAccounts, payTransactionPaymentAccounts, getAllAccounts, addMoneyForCustomer } from "../controllers/PaymentController";

const accountRouter = Router();

// dành cho customer
accountRouter.post("/payment-account/pay", payTransactionPaymentAccounts); // chuyển tiền cho người khác

// dành cho employee
accountRouter.post("/save-account/", createNewSaveAccounts); // tạo save account cho người khác khi đưa email
accountRouter.get("/all", getAllAccounts); // get thông tin các tài khoản mà user hiện có
accountRouter.post("/add-money", addMoneyForCustomer); // nạp tiền vào 1 tài khoản

export default accountRouter;