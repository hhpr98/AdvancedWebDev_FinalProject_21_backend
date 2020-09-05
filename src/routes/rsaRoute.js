import { Router } from "express";
import { getInfo, transaction } from "../controllers/RSAController"
const rsaRouter = Router();

rsaRouter.post("/info", getInfo);
rsaRouter.post("/transfers", transaction);

export default rsaRouter;