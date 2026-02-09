
import prismaClient from "@repo/db/client";
import { Request, RequestHandler, Response } from "express";
import asyncHandler from 'express-async-handler';


export const createRoom : RequestHandler = asyncHandler(async (req, res) => {

  await prismaClient.default.room.create({
    data : {adminId: req.user.id}
  })
});
