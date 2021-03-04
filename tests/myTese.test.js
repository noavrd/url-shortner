const request = require("supertest");
const fs = require("fs");
const { TestScheduler } = require("jest");
const { items } = require("../dataBase");
const app = require("../app");

describe("POST route", ()=> {
    const originalUrl = "https://www.youtube.com/?hl=iw&gl=IL";
    const items = [];
    it("should post a new short id successfully", async () => {
        const response = await request(app).post("/api/shorturl/new").type("form").send({url : originalUrl});
        expect(response.status).toBe(200);
    });
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

    it("should return an error with status 404 for can`t find url", async () => {
        const response = await request(app).get("/hello-25");

        //if the status code 404
        expect(response.status).toBe(404);
    });
    
})