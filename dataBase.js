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

class DataBase {
  constructor() {
    this.urls = [];
  }
  addUrl (originalUrl, shortUrl) {
    this.urls.push( new Url(originalUrl, shortUrl) );
  }
  deleteUrl (originalUrl) {
    for (let i = 0; i < this.urls.length; i++) {
      if(this.urls[i].originalUrl === originalUrl) {
        this.urls.splice(i, 1);
      }
    }
  }
  checkIfUrlExists(currentUrl) {
    for (let i = 0; i < this.urls.length; i++) {
        if ( this.urls[i].originalUrl === currentUrl ) {
          this.urls[i].count += 1;
          return this.urls[i].shortUrl;
        }
    }
    return false;
  }
} 


module.exports = DataBase;
module.exports = Url;



