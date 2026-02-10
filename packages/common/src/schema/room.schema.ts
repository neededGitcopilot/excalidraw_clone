// Create room schema

import z from 'zod';

export const createRoomSchema = z.object({
  body: z.object({}),
});
