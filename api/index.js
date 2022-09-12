const express = require("express")
const dotenv = require("dotenv");
const app = express()
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)

app.listen("5000", () => {
    console.log("backend is runnig");
})

console.log('yoxlama');
