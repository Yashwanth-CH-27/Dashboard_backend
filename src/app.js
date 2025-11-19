const express = require("express")
const dbConnect = require("./config/database")
const authRouter = require("./Routers/authRouters")
const profileRouters = require("./Routers/profileRouters")
const cookieParser = require("cookie-parser")
const app = express()

app.use(express.json())
app.use(cookieParser());

app.use("/",authRouter)
app.use("/",profileRouters)

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