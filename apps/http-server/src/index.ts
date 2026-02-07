import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'health is okay',
  });
});
app.listen(4445, () => {
  console.log('server is running');
});
