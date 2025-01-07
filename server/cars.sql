DROP TABLE IF EXISTS cars;
CREATE TABLE IF NOT EXISTS cars(
     id     INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
    ,brand  VARCHAR(12) NOT NULL
    ,type   VARCHAR(8) NOT NULL
    ,color  VARCHAR(8) NOT NULL
);
INSERT INTO cars(id, brand, type, color) VALUES (1, "Volvo", "Kombi", "Röd");
INSERT INTO cars(id, brand, type, color) VALUES (2, "Volvo", "Kombi", "Röd");

select * from cars;