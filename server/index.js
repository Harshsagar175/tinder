const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const { connectDb } = require("./db/connection");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

require("dotenv").config();
app.use(express.json());
connectDb();
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("<center><h1>Hello bantai log</h1></center>");
});
app.use("/api", require("./routes/route"));

const users = {};

io.on("connection", (socket) => {
  // console.log(socket.id, "Connected");
  // send a welcome message to the connected client
  socket.emit("welcome", `Welcome to the chat server ${socket.id}`);

  // handle the inititate-chat event
  socket.on("initiate-chat", ({ senderEmail, recipientEmail }) => {
    // store the recipient's socket id
    users[senderEmail] = socket.id;
    // console.log(Object.keys(users).length);
    // notify the recipient about the new user
    if (users[recipientEmail]) {
      // notify both the sender and the recipient that the chat is initiated
      io.to(users[recipientEmail]).emit("chat-initiated", senderEmail);
      io.to(users[senderEmail]).emit("chat-initiated", recipientEmail);
    } else {
      // handle offline user
      // console.log(`User ${recipientEmail} is offline`);
      // notify the sender that the recipient is offline
      io.to(users[senderEmail]).emit("recipient-offline", recipientEmail);
    }
  });

  // handle sending messages
  socket.on("send-message", ({ senderEmail, recipientEmail, message }) => {
    // send the message to the recipient/receiver
    // console.log({ senderEmail, recipientEmail, message });
    if (users[recipientEmail]) {
      // send the message only to the recipient
      io.to(users[recipientEmail]).emit("receive-message", {
        senderEmail,
        message,
      });
    } else {
      // handle offline user
      console.log(`User ${recipientEmail} is offline`);
      // notify the sender that the recipient is offline
      io.to(users[senderEmail]).emit("recipient-offline", recipientEmail);
    }
  });

  // handle the disconnect event
  socket.on("disconnect", () => {
    // console.log(socket.id, "Disconnected");
    // remove the socket id form the user object
    const email = Object.keys(users).find((key) => users[key] === socket.id);
    if (email) {
      delete users[email];
    }
  });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
