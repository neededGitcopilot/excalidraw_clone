// Create room schema

import z from 'zod';

export const createRoomSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50),
  }),
});
