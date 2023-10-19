const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

// const {router} = require("../routes/restaurants")
// router.use("/restautants", router)

// TODO: Create your GET Request Route Below: 
app.get("/restaurants",async (req, res) => {
    const allRestaurants = await Restaurant.findAll();
    res.send(allRestaurants);
})

app.use(express.json())
app.get("/restaurants/:id", async (req, res) => {
    const id = req.params.id
    const out  = await Restaurant.findByPk(id);
    res.json(out);
})

//app.use(express.urlencoded());
app.put("/restaurants/restaurant/:id", async (req,res,next) => {
    try {
        const updated = await Restaurant.update(
            req.body,
            {where: {id: req.params.id}}
        );
        if (updated[0] == 0){
            throw new Error(("No update occured"))
        }
        res.sendStatus(200);
    } catch(err){
        next(err);
    }
})

app.post("/restaurants", async (req,res, next) => {
    try{
        const addRes = await Restaurant.create(req.body);
        if (!addRes) {
            throw new Error("Didn't create user")
        }
        res.json(addRes.name)
    } catch (err){
        next(err);
    }
})

app.delete("/restaurants/:id", async (req,res,next) => {
    try {
        const deleted = await Restaurant.destroy({where:{id: req.params.id}})
        if(deleted == 0){
            throw new Error("No user deleted");
        }
        res.sendStatus(200);
    } catch(err){
        next(err)
    }
})

module.exports = app;