import z from 'zod';

export const joinRoom = z.object({
  body: z.object({
    id: z.string(),
    name: z.string().min(2).max(50),
  }),
});
