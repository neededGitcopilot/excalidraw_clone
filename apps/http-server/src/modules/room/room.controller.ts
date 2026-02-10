import { successResponse } from '@repo/backend-common/response';
import { createRoomSchema } from '@repo/common/schema';
import prismaClient from '@repo/db/client';
import { Request, RequestHandler, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const createRoom: RequestHandler = asyncHandler(async (req, res) => {
  const { name } = createRoomSchema.parse({
    body: req.body,
  }).body;
  const room = await prismaClient.default.room.create({
    data: { adminId: req.user.id, name },
  });
  console.log(room);
  res.status(200).json(successResponse('Room Created Successful'));
});
