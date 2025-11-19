const express = require("express")
const dbConnect = require("./config/database")
const app = express()

app.use(express.json())

dbConnect()
    .then( () =>{
        console.log("Database Connection Successful!")
        app.listen(5000, () => {
            console.log("Successfully listening on PORT num 5000")
        })
    } )
    .catch( (err) => {
        console.log("Database connection is not successful " + err.message)
    } )