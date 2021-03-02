const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

class DatBase {
  constructor (originalUrl) {
    this.creationDate = dateSql();
    this.redirectCount = 0;
    this.originalUrl = originalUrl;
    this.shorturlId = shorturlId();
  }
  
}

function dateSql() {
  let date = new Date();
  date = date.toISOString().split('T')[0] + " " + date.toTimeString().split(" ")[0];
}