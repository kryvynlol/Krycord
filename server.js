const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const rooms = new Map();

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {
  socket.on("join-room", ({ room, name }) => {
    room = String(room || "geral").trim().slice(0, 40) || "geral";
    name = String(name || "Visitante").trim().slice(0, 24) || "Visitante";
    const previous = socket.data.room;
    if (previous) socket.leave(previous);
    socket.join(room);
    socket.data.room = room;
    socket.data.name = name;
    socket.to(room).emit("peer-joined", { id: socket.id, name });
    const peers = [...(io.sockets.adapter.rooms.get(room) || [])]
      .filter(id => id !== socket.id)
      .map(id => ({ id, name: io.sockets.sockets.get(id)?.data.name || "Visitante" }));
    socket.emit("room-state", { room, peers });
    io.to(room).emit("member-count", io.sockets.adapter.rooms.get(room)?.size || 1);
  });

  socket.on("chat-message", text => {
    const room = socket.data.room;
    if (!room) return;
    const message = String(text || "").trim().slice(0, 1000);
    if (!message) return;
    io.to(room).emit("chat-message", {
      id: socket.id, name: socket.data.name || "Visitante",
      text: message, time: new Date().toLocaleTimeString("pt-BR", {hour:"2-digit", minute:"2-digit"})
    });
  });

  for (const event of ["offer", "answer", "ice-candidate"]) {
    socket.on(event, payload => {
      if (payload?.to) io.to(payload.to).emit(event, { from: socket.id, data: payload.data });
    });
  }

  socket.on("disconnect", () => {
    const room = socket.data.room;
    if (room) {
      socket.to(room).emit("peer-left", { id: socket.id });
      io.to(room).emit("member-count", Math.max(0, (io.sockets.adapter.rooms.get(room)?.size || 1) - 1));
    }
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Discord Web disponível em http://localhost:${port}`));