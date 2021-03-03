const express = require("express");
const shortid = require("shortid");
const validUrl = require("valid-url");
const url = require("../dataBase");
const router = express.Router();
const dataBase = url.DataBase;

router.post("/new", async (req, res) => {
    const longUrl = req.body.longUrl;
    const baseUrl = "api/shorturl/new";

    //make an original url id
    const urlCode = shortid.generate();

    //check if the original url is valid
    if ( validUrl.isUri(longUrl) ) {

        try {
            const urlExists = await checkIfUrlExists(dataBase ,longUrl);
            //check if url exists - if not adds new url to dataBase
            if (!urlExists) {
                const shortUrl = baseUrl + "/" + urlCode;
                urlExists  = dataBase.addUrl(longUrl, shortUrl);
                return res.status(201).json(urlExists);
            } else {
                //if url exists return exists shortUrl
                return res.status(200).json(urlExists);
            }

        } catch(err) {
            //server error
            console.error(err.message);
            return res.status(500).json("Internal Server error " + err.message);
        }
    } else {
        res.status(400).json("Invalid URL. Please enter a valid url for shortening.");
    }    
});

module.exports = { router };