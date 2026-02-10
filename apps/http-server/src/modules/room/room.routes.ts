import { Router } from 'express';
import { createRoom } from './room.controller.js';

const roomRouter = Router();

// create room
roomRouter.post('/', createRoom);
