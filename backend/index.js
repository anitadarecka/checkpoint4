/* eslint-disable no-restricted-syntax */
require("dotenv").config();
const http = require("http");

const { Server } = require("socket.io");
const app = require("./src/app");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: " http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
});

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room ${data}`)
//   });

//   socket.on("send_msg", (data) => {
//     socket.to(data.room).emit("receive_msg", data);
//   });

//   socket.on("typing", (data) => {
//     if (data.typing === true) {
//       io.emit("display", data);
//     } else {
//       io.emit("display", data);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected.", socket.id);
//   });
// });

const port = parseInt(process.env.APP_PORT ?? "8000", 10);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${port}`);
  }
});
