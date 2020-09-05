import { Router } from "express";
import { addReceiver, editReceiver, removeReceiver, getAllReceivers } from "../controllers/receiverController";


const receiverRouter = Router();

receiverRouter.get("/", getAllReceivers);
receiverRouter.post("/", addReceiver);
receiverRouter.put("/", editReceiver);
receiverRouter.delete("/", removeReceiver);

export default receiverRouter;