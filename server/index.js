const express = require("express");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");


require("dotenv").config();

// app
const app = express();


app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());
app.get('/', async (req, res) => {

    res.json('good start');
})


// port
const port = 8080;

app.listen(port, () => console.log(`Server is running on port ${port}`));