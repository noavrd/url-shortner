const express = require('express');
const shortid = require('shortid');
const validUrl = require('valid-url');
const DataBase = require('../dataBase.js');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded());

router.post('/new', async (request, response) => {
  const url = request.body.url;

  if (!validUrl.isUri(url)) {
    response.render('error');
  } else {
    try {
      let shortUrl = await DataBase.addUrl(url);
      response.render('displayUrl', { shortUrl });
      // response.status(200).send(`Your new URL: localhost:3000/${shortUrl}`);
    } catch (e) {
      response.status(500).send('Internal Server Error!'`${e}`);
    }
  }
});

module.exports = { router };
