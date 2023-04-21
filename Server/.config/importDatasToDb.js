const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
    host: process.env.SECRET_HOST,
    user: process.env.SECRET_USER,
    password: process.env.SECRET_PASSWORD,
    database: process.env.SECRET_DATABASE
});

if (connection) {
    console.log("Connected to MySQL database");
};

const ingredientData = fs.readFile('./data/ingredients.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return;
    }

    const ingredients = JSON.parse(data);

    ingredients.forEach(ingredient => {
        // insert ingredients in database

        const sql = `INSERT INTO ingredient (name, glycemic_index) VALUES ('${ingredient.name}', '${ingredient.glycemic_index}' )`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
        });
    });
    console.log("Ingredients imported");
});

const roleData = fs.readFile('./data/roles.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return;
    }

    const roles = JSON.parse(data);

    roles.forEach(role => {
        // insert roles in database
        const sql = `INSERT INTO role (name) VALUES ('${role.name}')`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            
        });
    });
    console.log("Roles imported");
    connection.end();
});