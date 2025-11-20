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

const PORT = process.env.PORT || 3000;

dbConnect()
    .then( () =>{
        console.log("Database Connection Successful!")
        app.listen(PORT, () => {
            console.log("Successfully listening on PORT num: ", PORT)
        })
    } )
    .catch( (err) => {
        console.log("Database connection is not successful " + err.message)
    } )