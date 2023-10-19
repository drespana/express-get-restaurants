
// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest");
const db = require('./db/connection');
const Restaurant = require('./models');
const app = require('./src/app');
const seedRestaurant = require('./seedData');

describe('./restauraunt endpoint', () => {

    // GET /restaurans returns a status code of 200
    test("GET All Restaurants", async () => {
        const response = await request(app).get("/restaurants");
        expect(response.statusCode).toBe(200)
        
    })
    
    // GET /restaurants returns an array of objects(Restaurants);
    test("Returns an array of Restaurant objects", async () => {
        const response = await request(app).get("/restaurants")
        expect(Array.isArray(response.body)).toEqual(true)
    })

    // GET /restaurants returns the correct number of restaurants
    test("Returns the correct number of Restaurant objects", async () => {
        const response = await request(app).get("/restaurants")
        expect(response.body.length).toBe(3)
    })

    // GET /restaurants returns the correct data
    test("Returns data of corresponding Restaurant object", async () => {
        const response = await request(app).get("/restaurants")
       expect(response.body[0].name).toBe("AppleBees")
    })

    // GET /restaurants/:id returns the correct data
    test("Returns data of corresponding Restaurant ID", async () => {
        const response = await request(app).get("/restaurants/2")
        expect(response.body.name).toBe("LittleSheep");
    })

    // POST /restaurnats returns the restaurants array with the updated value
    test("Can POST new Restaurant object and return it at the end of all Restaurant objects", async () => {
        const response = await request(app)
            .post("/restaurants")
            .send({name:"Panda Express", location:"Austin", cuisine:"Fast Food"})
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual("Panda Express")
    })

    // PUT /restaurants/:id updates the restaurant with the provided value
    test("Can PUT by Restaurant ID", async () => {
        const response = await request(app)
            .put("/restaurants/restaurant/2")
            .send({name: "Sonic", location: "Chicago", cuisine:"Fast Food"})
        expect(response.statusCode).toBe(200)
    })

    // DELETE /restaurant/:id deletes the restaurant with the provided id
    test("Can DELETE by Restaurant ID", async () => {
        const response = await request(app)
        .delete("/restaurants/2")
        expect(response.statusCode).toBe(200)
    })
})
