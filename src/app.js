const express = require('express');
const routes = require("./routes/index");
const { errorHandler, notFound } = require('./middlewares/error.middleware');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//logger middleware
app.use("", (req, res, next) => {
    next();
});



app.get("/api-test", (req, res) => {
    res.send("Server is up and running");
});

app.use("/api", routes); 

app.use(notFound);
app.use(errorHandler);

module.exports = app;