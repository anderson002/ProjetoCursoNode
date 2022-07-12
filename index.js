// const { Person } = require("./Modules/person");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/connect");

dotenv.config();

connectToDatabase();


// require("./Modules/path");
// require("./modules/fs")
// require('./modules/http');
require("./Modules/express");

// const person = new Person ("Ander");

