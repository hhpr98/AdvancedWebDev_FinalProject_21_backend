import { Router } from "express";
import { getAllEmployees, findOneEmployees, createNewEmployees, historyTransaction, getAllTransaction, getForeignTransactionOne, getForeignTransactionAll, updateAnEmployees, resetPasswordAnEmployees, deleteAnEmployees } from "../controllers/employeeController";

const employeeRouter = Router();

// dành cho employee lẫn admin
employeeRouter.post("/history/customer", historyTransaction);

// chỉ dành cho admin
employeeRouter.get("/", getAllEmployees);
// employeeRouter.get("/:id", findOneEmployees);
employeeRouter.post("/", createNewEmployees);
employeeRouter.put("/update/name", updateAnEmployees);
employeeRouter.put("/update/password", resetPasswordAnEmployees);
employeeRouter.delete("/", deleteAnEmployees);
employeeRouter.post("/history/all", getAllTransaction);
employeeRouter.post("/history/foreign/one", getForeignTransactionOne);
employeeRouter.post("/history/foreign/all", getForeignTransactionAll);

export default employeeRouter;