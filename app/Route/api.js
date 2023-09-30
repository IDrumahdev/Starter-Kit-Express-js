import express from 'express';
const route             = express.Router();
import routeUser from './AppRoute/userRoute.js';

route.use('/user', routeUser);

export default route;