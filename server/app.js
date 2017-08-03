import express from "express";
import http from "http";

import ShareDB from "sharedb";
import {type} from "ot-text";

import WebSocket from "ws";
import WebSocketJSONStream from "websocket-json-stream";

ShareDB.types.register(type);

const app = express();
const backend = new ShareDB();

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
