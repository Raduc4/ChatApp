import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

// import { channels } from "./channels.js";

const channels = [
  {
    idName: "Simple-Dimple",
    participants: 0,
    sockets: [],
  },
  {
    idName: "PopIt",
    participants: 0,
    sockets: [],
  },
];

const PORT = 5000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  console.log("New client connection");
  socket.emit("connection", null);

  socket.on("channelJoin", (id) => {
    console.log("Channel Join: " + id);
    channels.forEach((c) => {
      // c === channel
      if (c.idName === id) {
        if (c.sockets.indexOf(socket.id) === -1) {
          c.sockets.push(socket.id);
          c.participants++;

          io.emit("channel", c);
        }
      } else {
        let index = c.sockets.indexOf(socket.id);
        if (index != -1) {
          c.sockets.splice(index, 1);
          c.participants--;
          io.emit("channel", c);
        }
      }
    });
    return id;
  });

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    channels.forEach((c) => {
      let index = c.sockets.indexOf(socket.id);
      if (index != -1) {
        c.sockets.splice(index, 1);
        c.participants--;
        io.emit("channel", c);
      }
    });
  });
});

app.get("/", (req, res) => {
  res.json("Api is running....");
});

app.get("/rooms", (req, res) => {
  res.send(channels).status(200);
});
app.get("/rooms/:id", (req, res) => {
  const id = req.params.id;
  const channel = channels.filter((channel) => {
    return channel.id;
  });

  res.send(channel).status(200);
});

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
