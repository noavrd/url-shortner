const request = require("supertest");
const fs = require("fs");
const { TestScheduler } = require("jest");
const { items } = require("../dataBase");
const app = require("../app");
const DataBase = require("../dataBase");

describe("POST route", ()=> {
    const items = [];
    it("should post a new short id successfully", async () => {
        const response = await request(app)
        .post("/api/shorturl/new")
        .type("form")
        .send({url : "https://www.youtube.com/?hl=iw&gl=IL"});
        expect(response.status).toBe(200);
    });
    it("should return an error for invalid url", async () => {
        const response = await request(app)
        .post("/api/shorturl/new")
        .type("form")
        .send({url : "945"});
        expect(response.status).toBe(400);

    })
    it("should add to count", async () => {
        let shortUrl = await DataBase.addUrl("https://www.youtube.com/?hl=iw&gl=IL");
        console.log(shortUrl);
        let db = DataBase();
        console.log(db);
        const response = await request(app)
        .post("/api/shorturl/new")
        .type("form")
        .send({url : "https://www.youtube.com/?hl=iw&gl=IL"});
        expect(shortUrl[0].count).toEqual(1);
    })
})

describe("GET route", () => {
    const expectedItem = [ {
        originalUrl: "https://www.google.co.il/",
        shortUrl: "b8v2JY-ch",
        count: 0,
        date: "2021-03-04 09:29:35"
    }];
    it("should return an original url by a short Id" ,async () => {
        const response = await request(app).get("/b8v2JY-ch");

        //if the status code 200
        expect(response.status).toBe(302);

    });

    it("should return an error with status 400 for can`t find short url", async () => {
        const response = await request(app).get("/hello-25");

        //if the status code 400
        expect(response.status).toBe(400);
    });

    it("should return an error with status 404 for can`t find main url", async () => {
        const response = await request(app).get("/ews/index.html");

        //if the status code 404
        expect(response.status).toBe(404);
    });
    
})