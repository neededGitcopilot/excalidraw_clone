import { z } from 'zod';

/**
 * LOGIN
 */
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

/**
 * REGISTER
 */
export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3),
    email: z.string().email(),
  }),
});

/**
 * VERIFY EMAIL
 */
export const verifyEmailSchema = z.object({
  body: z.object({
    password: z.string().min(6),
  }),
  query: z.object({
    token: z.string(),
  }),
});