import express from 'express';
const userRoute = express.Router();
import { Get, Register, Login, Logout } from '../../Controller/userController.js';
import { verifyToken } from '../../Middleware/VerifyToken.js';
import { refreshToken } from '../../Controller/refreshTokenController.js';
import apicache from 'apicache';

let cache = apicache.middleware;

userRoute.get('/',cache('1 minutes'), verifyToken , Get);
userRoute.post('/register',Register);
userRoute.post('/login',Login);
userRoute.get('/token',refreshToken);
userRoute.delete('/logout', Logout);

export default userRoute;