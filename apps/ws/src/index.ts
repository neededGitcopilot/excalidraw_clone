import { WebSocketServer } from 'ws';

const ws = new WebSocketServer({ port: 4446 });

ws.on('connection', (wss) => {
  wss.on('message', (data: Buffer) => {
    console.log(JSON.parse(data.toString()));
  });
});
