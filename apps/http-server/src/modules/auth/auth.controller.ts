import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { RequestHandler } from 'express';

import prismaClient from '@repo/db/client';
import { successResponse } from '@repo/backend-common/response';
import { ApiError } from '@repo/backend-common/errors';
import {TokenType} from '@repo/db/enum';
import { generateToken, hashToken } from '@repo/backend-common/utils/token';
import { env } from '@repo/backend-common/config';

import { AuthSerializer } from './auth.serializer.js';
import { loginSchema, registerSchema, verifyEmailSchema } from './auth.schema.js';

/**
 * LOGIN
 */
export const loginUser: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password } = loginSchema.parse({
    body: req.body,
  }).body;

  const user = await prismaClient.default.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) {
    throw new ApiError(401, 'Invalid email or password');
  }

  if (!user.isActive) {
    throw new ApiError(403, 'Please verify your email first');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const accessToken = jwt.sign({ userId: user.id }, env.JWT_SECRET as string);

  res
    .status(200)
    .json(successResponse('Login successful', AuthSerializer.login(user, accessToken)));
});

/**
 * REGISTER
 */
export const registerUser: RequestHandler = asyncHandler(async (req, res) => {
  const { username, email } = registerSchema.parse({
    body: req.body,
  }).body;

  const existingUser = await prismaClient.default.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(400, 'Email is already taken');
  }

  const rawToken = generateToken();
  const hashedToken = hashToken(rawToken);

  const user = await prismaClient.default.user.create({
    data: {
      username,
      email,
      token: {
        create: {
          token: hashedToken,
          type: TokenType.EMAIL_VERIFY,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        },
      },
    },
  });

  const magicLink = `http://localhost:4444/password-setup?token=${rawToken}`;

  res
    .status(200)
    .json(
      successResponse('User registered successfully', AuthSerializer.register(user, magicLink))
    );
});

/**
 * VERIFY EMAIL
 */
export const verifyEmail: RequestHandler = asyncHandler(async (req, res) => {
  const {
    body: { password },
    query: { token },
  } = verifyEmailSchema.parse({
    body: req.body,
    query: req.query,
  });

  const hashedToken = hashToken(token);

  const authToken = await prismaClient.default.authToken.findUnique({
    where: { token: hashedToken },
  });

  if (!authToken || authToken.used) {
    throw new ApiError(400, 'Invalid or used token');
  }

  if (authToken.expiresAt < new Date()) {
    throw new ApiError(400, 'Token expired');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prismaClient.default.$transaction([
    prismaClient.default.user.update({
      where: { id: authToken.userId },
      data: {
        password: hashedPassword,
        isActive: true,
      },
    }),
    prismaClient.default.authToken.update({
      where: { id: authToken.id },
      data: { used: true },
    }),
  ]);

  res.status(200).json(successResponse('Password created and email verified successfully'));
});