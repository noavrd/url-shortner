const express = require("express");;
const router = express.Router();

router.get("/", (res, req) => {
    res.send("url shorter home page");
});

router.get("api/shorturl/new", (res, req) => {
    res.send("new short url address");
});

module.exports = router;