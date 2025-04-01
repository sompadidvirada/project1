const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const app = express();
const { readdirSync } = require("fs");
const cors = require("cors");

const defaultImage = "public/uploads/nigler.png";

app.use(express.json({ limit: `100mb` }));
app.use(morgan("dev"));
app.use(cors());

// Middleware to check if the requested image exists
app.get("/uploads/:imageName", (req, res) => {
  const { imageName } = req.params;
  const imagePath = path.join(__dirname, "public/uploads", imageName);

  // Check if the image exists, otherwise send the default image
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.sendFile(path.join(__dirname, defaultImage));
  }
});
readdirSync("./routes").map((item) =>
  app.use("/", require("./routes/" + item))
);

app.listen(5003, () => console.log("Server is Running in port 5003!"));
