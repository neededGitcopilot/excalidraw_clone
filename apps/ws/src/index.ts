import { WebSocketServer } from 'ws';

const ws = new WebSocketServer({ port: 4446 });

interface Room {
  name: string;
  id: string;
}

let rooms: Room[] = [];

const joinRoom = (data) => {
  try {
    const room = rooms.filter((room) => room.id === data.id);
  } catch (error) {}
};
ws.on('connection', (wss) => {
  wss.on('message', (d: Buffer) => {
    const data = JSON.parse(d.toString());
    if (data.type === 'join_room') {
      joinRoom(joinRoom.safeParse(data));
    }
    if (data.type === 'message') {
    }
  });
});
