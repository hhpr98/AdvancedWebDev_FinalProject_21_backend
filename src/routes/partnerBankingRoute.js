import { Router } from "express";
import {getPartnerInfo, transactionPartner, getAllPartner} from "../controllers/PartnerBankingController"

const partnerRouter = Router();

partnerRouter.post("/info/:id", getPartnerInfo)
partnerRouter.post("/transfer/:id", transactionPartner)
partnerRouter.post("/get-partners", getAllPartner)

export default partnerRouter;