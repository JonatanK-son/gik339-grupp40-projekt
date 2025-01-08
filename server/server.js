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

server.get("/cars/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM cars WHERE id=${id}`

  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows[0]);
    }
  });
})

server.post("/cars", (req, res) => {
  const car = req.body;
  const sql = `INSERT INTO cars(brand, type, fuel, color, year) VALUES
  (?,?,?,?,?)`;

  db.run(sql, Object.values(car), (err) => {
    if(err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Bilen sparades");
    }
  });
})

server.put("/cars", (req, res) => {
  const bodyData = req.body;

  const id = bodyData.id;
  const car = {
    brand: bodyData.brand,
    type: bodyData.type,
    fuel: bodyData.fuel,
    color: bodyData.color

  };

  let updateString = "";
  const columnsArray = Object.keys(car);
  columnsArray.forEach((column, i) => {
    updateString += `${column}="${car[column]}"`;
    if(i !== columnsArray.length - 1) updateString += ",";
  });
  const sql = `UPDATE cars SET ${updateString} WHERE id=${id}`; 

  db.run(sql, (err) => {
    if(err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Bilen updaterades");
    }
  });
});

server.delete("/cars/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM cars WHERE id=${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Bilen borttagen");
    }
  })
})