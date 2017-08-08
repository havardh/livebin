import express from "express";
import http from "http";

import ShareDB from "sharedb";
import {type} from "ot-text";

import WebSocket from "ws";
import WebSocketJSONStream from "websocket-json-stream";
import ShareDBMongo from "sharedb-mongo";

const username = process.env.MONGO_USERNAME || "";
const password = process.env.MONGO_PASSWORD || "";
let credentials = "";
if (username && password) {
  credentials = `${username}:${password}@`;
}
const mongoUrl = process.env.MONGO_URL || "localhost:27017/livebin";

const db = ShareDBMongo(`mongodb://${credentials}${mongoUrl}`);

ShareDB.types.register(type);

const app = express();
const backend = new ShareDB({db});

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
