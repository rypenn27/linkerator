const express = require("express");
const { client } = require("./db");
const { PORT = 3000 } = process.env;
const server = express();

// create logs for everything
const morgan = require("morgan");
server.use(morgan("dev"));

// handle application/json requests
const bodyParser = require("body-parser");
server.use(bodyParser.json());
//server.use(express.urlencoded({ extended: false }));

// here's our static files
const path = require("path");
server.use(express.static(path.join(__dirname, "build")));

// here's our API
server.use("/api", require("./routes"));
// // by default serve up the react app if we don't recognize the route
server.get("/", (req, res, next) => {
  const html = path.join(__dirname, "build", "index.html");
  res.sendFile(html);
});
server.get("/potato", (req, res) => {
  console.log("hit");
  res.send(JSON.stringify("Potato"));
});

server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log("Database is open for business!");
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});
