const fs = require("fs").promises;
const shortid = require("shortid");

class Item {
  constructor(originalUrl) {
    this.originalUrl = originalUrl;
    this.shortUrl = shortid.generate();
    this.count = 0;
    this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
  }
}

class DataBase {
  static items = [];

  static async readAllData() {
    const data = await fs.readFile(
      process.cwd()+"/database/dataBase.json",
      "utf8",
      (err) => {
        if (err) return;
      }
    );
    return this.items = JSON.parse(data);
  }

  static async addUrl(url) {
   const addData = await this.readAllData();

    for (let item of addData) {
      if (item.originalUrl === url) {
        return item.shortUrl;
      }
    }

    let newItem = new Item(url);
    this.items.push(newItem);
    fs.writeFile(
      process.cwd()+"/database/dataBase.json",
      JSON.stringify(this.items, null, 4)
    );

    return newItem.shortUrl;
  }

  static async findOriginalUrl(shortUrl) {
    const addData = await this.readAllData();

    for (let item of addData) {
      if (item.shortUrl === shortUrl) {
        item.count += 1;
        fs.writeFile(
          process.cwd()+"/database/dataBase.json",
          JSON.stringify(addData, null, 4)
        );
        return item.originalUrl;
      }
    }
    return false;
  }
}

module.exports = DataBase;
