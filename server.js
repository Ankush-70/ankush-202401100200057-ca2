const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
mongoose.connect("mongodb+srv://ankushkumar70608742_db_user:Ankush244@cluster0.egklzfv.mongodb.net/")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log(error);
        console.log("MongoDB is not Connected");
    });
const bookRoutes = require("./Routes/bookRoutes");
app.use("/api/books", bookRoutes);
app.listen(5000, () => {
    console.log("Server running on port 5000");
});