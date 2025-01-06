sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./cars.db");

express = require("express");
server = express();