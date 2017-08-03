import express from "express";
import http from "http";
import WebSocket from "ws";
import WebSocketJSONStream from "websocket-json-stream"
import ShareDB from "sharedb";
import {type} from "ot-text";
import ShareDBMongo from "sharedb-mongo";

ShareDB.types.register(type);
//const db = ShareDBMongo('mongodb://127.0.0.1:27017/livebin');

const app = express();
const backend = new ShareDB();



//app.use(express.static('static'));
const server = http.createServer(app);

const wss = new WebSocket.Server({server});
wss.on('connection', (ws, res) => {
  const stream = new WebSocketJSONStream(ws);
  backend.listen(stream);
});

wss.on('error', function (error) {
  throw error;
});

export {server, app};
