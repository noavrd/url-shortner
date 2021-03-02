const fs = require("fs");
class Url {
    constructor (originalUrl, shortUrl) {
      this.originalUrl = originalUrl;
      this.date = dateSql();
      this.count = 0;
      this.shortUrl = shortUrl;
    
    }
    
  }
  
  function dateSql() {
    let date = new Date();
    date = date.toISOString().split('T')[0] + " " + date.toTimeString().split(" ")[0];
    return date;
  }

class dataBase {
  constructor() {
    this.urls = [];
  }
  addUrl () {
    this.url.push(new Url(url))
  }
} 


module.exports = dataBase;
module.exports = Url;


  module.exports = DatBase;