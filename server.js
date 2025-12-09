const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

io.on("connection", (socket) => {
  console.log("New user connected");
  socket.on("watch", (qrId) => {
    // client will join a room named after qrId
    if (qrId) socket.join(qrId);
  });
});

app.post("/webhook", (req, res) => {
  // For testing we accept { qrId, amount, status } in body
  const { qrId, amount, status } = req.body || {};
  if (status === "SUCCESS" && qrId) {
    io.to(qrId).emit("payment_success", { qrId, amount });
  }
  res.json({ ok: true });
});

// test trigger: /test?qr=demo&amount=5
app.get("/test", (req, res) => {
  const qr = req.query.qr || "demo";
  const amount = req.query.amount || 5;
  io.to(qr).emit("payment_success", { qr, amount });
  res.send("Test event sent to " + qr);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server running on port " + PORT));
