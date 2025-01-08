DROP TABLE IF EXISTS cars;
CREATE TABLE IF NOT EXISTS cars(
     id     INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
    ,brand  VARCHAR(12) NOT NULL
    ,type   VARCHAR(10) NOT NULL
    ,fuel   VARCHAR(8) NOT NULL
    ,year  VARCHAR(8) NOT NULL
    ,color   VARCHAR(8) NOT NULL

    
);
INSERT INTO cars(id, brand, type, fuel, year, color) VALUES (1, "Volvo", "Kombi", "Bensin", "2020", "Röd");

select * from cars;