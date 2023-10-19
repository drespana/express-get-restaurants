const express = require("express");
const router = express.Routes();
const app = require("../src/app")
const Restaurant = require("../model/index");
const { check, validationResult } = require("express-validator");

router.use(express.json());

router.get("/", async (req, res) => {
    let restuarants = await Restaurant.findAll();
    res.json(restaurants);
})

router.get("/:id", async (req, res) => {
    let found = await Restaurant.findByPk(req.params.id);
    res.json(found);
})

router.post("/", [
    check("name").not().isEmpty().trim(),
    check("location").not().isEmpty().trim(),
    check("cuisine").not().isEmpty().trim()
], async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({error: errors.array()});
    } else {
        let restaurants = await Restaurant.findAll();
        const added = await Restaurant.create(req.body);
        restaurants.push(added);
        res.json(restaurants);
    }
})

router.delete("/:id", async(req, res) => {
    const deleted = await Musician.destroy({where: {id: req.params.id}});
    res.json(200);
})

module.exports = {router};