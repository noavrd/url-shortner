const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router");
//const shortUrl = require("./dataBase");

app.use(cors());
//app.use("/router", router);

app.use("/public", express.static(`./public`));
app.use(express.urlencoded( {extended: false} ));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
});
app.post("api/shorturl/new", async (res, req) => {
  await shortUrl.create({originalUrl: req.body.url})
  res.redirect("/")
});

module.exports = app;
