import {app, server} from "./sharejs";

import bodyParser from "body-parser";


app.use(bodyParser.json());

const files = {};

app.post("/api/file", (req, res) => {
  const {text} = req.body;
  files["file"] = text;

  res.json({msg: "hello"});
  res.end();
});

app.get("/api/file", (req, res) => {
  res.json({text: files["file"]});
  res.end();
});

export {app, server};
