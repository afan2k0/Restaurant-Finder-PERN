require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const db = require('./db')


app.use(express.json());

//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("select * from restaurants")
        console.log(results);
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
            restaurants: results.rows
        }
    })
    } catch(err) {
        console.log(err);
    } 
})


//get single restuarant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const result = await db.query("select * from restaurants where id = $1", [req.params.id])
        res.status(200).json({
        status: "success",
        data: {
            restaurant: result.rows[0]
        }
    })
    console.log(result.rows[0]);
    } catch(err) {
        console.log(err)
    }
    
})

//create restaurant
app.post("/api/v1/restaurants/", async (req, res) => {
    console.log(req.body);

    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range])
        console.log(results)
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch(err) {
        console.log(err)
    }
})

//update restuarant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
       const results = await db.query("UPDATE restaurants SET name = $1, location=$2, price_range=$3 where id=$4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id])
       console.log(results)
       res.status(200).json({
        status: "success",
        data: {
            restaurant: results.rows[0]
        }
       })
    } catch(err) {
        console.log(err)
    }
})

//delete
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurants where id = $1", [req.params.id])
        console.log(results)
        res.status(204).json({
            status: "success"
        })
    } catch(err) {
        console.log(err)
    }
    
})




const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`started listen on port ${port}`)
});