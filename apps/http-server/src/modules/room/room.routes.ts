import { Router } from 'express';
import { createRoom } from './room.controller.js';
import { protectedRouter } from '../../middleware/protectedRoute.js';

const roomRouter: Router = Router();

// create room
roomRouter.post('/', protectedRouter, createRoom);

export default roomRouter;
