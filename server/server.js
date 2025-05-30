const express = require("express");

const http = require("http"); // for creating the server
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app); // create raw server for socket.io
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const { readdirSync } = require("fs");
const cors = require("cors");


const io = new Server(server, {
  cors: {
    origin: "*", // adjust for security
    methods: ["GET", "POST"]
  }
});



const defaultImage = "public/uploads/nigler.png";

app.use(express.json({ limit: `100mb` }));
app.use(morgan("dev"));
app.use(express.static("public"));

app.use(
  cors({
    origin: true, // Allow any origin (or specify yours)
    credentials: true,
  })
);

io.on("connect", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

});

app.options("*", cors()); // handle preflight


// Serve uploaded images with fallback
app.get("/uploads/:imageName", (req, res) => {
  const { imageName } = req.params;
  const imagePath = path.join(__dirname, "public/uploads", imageName);
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.sendFile(path.join(__dirname, defaultImage));
  }
});


readdirSync("./routes").map((item) =>
  app.use("/", require("./routes/" + item))
);

// Start server
server.listen(5003, "0.0.0.0", () => {
  console.log("API + Socket.IO running on port 5003");
});