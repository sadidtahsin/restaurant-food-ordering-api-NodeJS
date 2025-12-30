const express = require('express');
const routes = require("./routes/index");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//logger middleware
app.use("", (req, res, next) => {
    console.log("Hello from logger middleware");
    next();
});



app.get("/api-test", (req, res) => {
    res.send("Server is up and running");
});

app.use("/api", routes); 


module.exports = app;