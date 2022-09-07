const express = require("express")
const dotenv = require("dotenv");
const app = express()
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.use("/", (req, res) => {
    console.log("main url hey");
})

app.use("/api/auth", authRoute)

app.listen("5000", () => {
    console.log("backend is runnig");
})

console.log('yoxlama');
