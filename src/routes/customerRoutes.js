import { Router } from "express";

import { getAllCustomers, createNewCustomers, findOneCustomer, changePassword, historyTransactionSelf, updateInfoCustomer } from "../controllers/customerController";



const userRouter = Router();

// dành cho employee
userRouter.get("/", getAllCustomers);
userRouter.post("/", createNewCustomers);
userRouter.get("/:email", findOneCustomer);

// dành cho customer
userRouter.post("/change-password", changePassword);
userRouter.post("/history", historyTransactionSelf);
userRouter.post("/update-profile", updateInfoCustomer);

export default userRouter;