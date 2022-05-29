//Antes de criar a API

var express = require("express");
var app = express();
const request = require("supertest");
const peopleController = require("../controller/peopleController");
const routes = require("../routes");
const mongoose = require('mongoose');
const { mockPostPeople } = require("../mock/mock.people");

app.use(express.json());
app.use(routes)

describe("Get /people ", () => {
    beforeEach(async() => {
        const mongo = process.env.MONGO;
        await mongoose.connect(mongo, {
            useNewUrlParser: true,
            useUnifiedTopology:  true
        });
    })
    test ("Get people List", async () => {
    return await request(app).get("/people", peopleController.show) 
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
    });
});

describe("POST /people ", () => {
    beforeEach(async() => {
        const mongo = process.env.MONGO;
        await mongoose.connect(mongo, {
            useNewUrlParser: true,
            useUnifiedTopology:  true
        });
    })
    test ("POST people", async () => {
    return await request(app).post("/people", peopleController.create) 
    .send(mockPostPeople)
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });
    });
});

//Escrevemos um Teste que inicialmente não passa (Red)

