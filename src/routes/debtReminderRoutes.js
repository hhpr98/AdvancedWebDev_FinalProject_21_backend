import { Router } from "express";
import { createDebtReminders, viewListDebtReminders, deleteDebtReminder } from "../controllers/DebtReminderController";

const debtRouter = Router();

// dành cho employee
debtRouter.post("/create", createDebtReminders);
debtRouter.get("/view", viewListDebtReminders);
debtRouter.delete("/delete-debt", deleteDebtReminder);


export default debtRouter;