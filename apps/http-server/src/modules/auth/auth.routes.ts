import { Router } from 'express';
import { loginUser, registerUser, verifyEmail } from './auth.controller.js';

const authRouter: Router = Router();
authRouter.post('/login', loginUser);
authRouter.post('/register', registerUser);
authRouter.post('/verify/email', verifyEmail);

export default authRouter;