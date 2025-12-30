const app = require("./src/app");
const mongoose = require("mongoose");
require('dotenv').config();

//  db connetion
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});



app.listen(4000, () => {
    console.log("Server is running on port 4000");
});