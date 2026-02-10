import express from 'express';
import cors from 'cors';
import authRouter from './modules/auth/auth.routes.js';
import roomRouter from './modules/room/room.routes.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);
app.use('/room', roomRouter);
app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'health is okay',
  });
});
app.listen(4445, () => {
  console.log('server is running');
});
