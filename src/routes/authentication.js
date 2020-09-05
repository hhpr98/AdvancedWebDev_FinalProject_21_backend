import {Router} from 'express';
import { login, employeeLogin,refreshToken } from '../controllers/AuthController';

const   authRouter = Router();

authRouter.post('/login',login);
authRouter.post('/admin-login',employeeLogin);
authRouter.post('/refresh-token',refreshToken)


export default authRouter;