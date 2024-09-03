const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/routes.js")
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000

mongoose.connect(process.env.DB || process.env.MONGODB_URI)
    .then(() => { console.log("mongodb is connected") })
    .catch((er) => { console.log(er) })

app.use('/', router)

app.listen(port, () => { console.log(`server is running ${port}`) })