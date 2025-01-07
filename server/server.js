const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./cars.db");

const express = require("express");
const server = express();

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");

    next();
  });

server.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});

server.get("/cars", (req, res) => {
  db.all("SELECT * FROM cars", (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows);
    }
  });
});

server.post("/cars", (req, res) => {
  const car = req.body;
  const sql = `INSERT INTO cars(brand, type, fuel, color) VALUES
  (?,?,?,?)`;

  db.run(sql, Object.values(car), (err) => {
    if(err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Bilen sparades");
    }
  });
})
