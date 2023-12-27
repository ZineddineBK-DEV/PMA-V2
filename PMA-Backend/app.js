// ============imports=============
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require("dotenv/config");
//const cors =require ("cors");
const path = require('path')
    // ============ imporing routes ================
const usersRoute = require("./src/routes/userRoute");
const projectRoute = require("./src/routes/projectRoute");
const reclamationRoute = require("./src/routes/reclamationRoute");
const taskRoute = require("./src/routes/taskRoute");
const eventRoute = require("./src/routes/eventRoute");
const procesRoute = require('./src/routes/procesvRoute')
const problemRoute = require('./src/routes/problemeRoute')
    //========== configuration ============

//app.use(bodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control"
    );
    // intercept OPTIONS method
    if ("OPTIONS" == req.method) {
        res.status(200).send();
    } else {
        next();
    }
});

//=========== connecting to database ==============
mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => console.log("error has been occured: ", err));

// ========= configurring routes ==========
const url = process.env.API_URL;
/* '/static' */
app.use('/static/images', express.static(path.join(__dirname, './src/static/images')))
app.use('/projectsFile', express.static(path.join(__dirname, './src/uploads/projects')))

//app.use(express.static('static/images'))
app.use(`${url}/users`, usersRoute);
app.use(`${url}/projects`, projectRoute);
app.use(`${url}/reclamations`, reclamationRoute);
app.use(`${url}/tasks`, taskRoute);
app.use(`${url}/events`, eventRoute);
app.use(`${url}/procesV`, procesRoute)
app.use(`${url}/problems`, problemRoute)

    // ======== exporting app ========
module.exports = app; 