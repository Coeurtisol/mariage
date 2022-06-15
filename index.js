import express from "express";
import router from "./router.js";

const server = express();

server.use(express.json());
server.use(router);
server.use(express.static('public'));

const HOST = "http://localhost";
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server listen on ${HOST}:${PORT}`);
});
