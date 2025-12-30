const app = require("./src/app");
const mongoose = require("mongoose");

//  db connetion
mongoose.connect("mongodb+srv://node-app:m8Y8gkSN73XuAYsM@cluster0.wfxzsle.mongodb.net/restaurent-db?appName=Cluster0",)
.then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});



app.listen(4000, () => {
    console.log("Server is running on port 4000");
});