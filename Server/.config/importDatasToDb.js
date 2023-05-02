const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
    host: process.env.SECRET_HOST,
    user: process.env.SECRET_USER,
    password: process.env.SECRET_PASSWORD,
    database: process.env.SECRET_DATABASE
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

fs.readFile('./data/ingredients.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const ingredients = JSON.parse(data);

    let count = 0;
    const total = ingredients.length;

    ingredients.forEach(ingredient => {
        // check if ingredient already exists in database
        const checkIngredient = `SELECT * FROM ingredient WHERE name = ('${ingredient.name}')`;
        connection.query(checkIngredient, function (err, result) {
            if (err)
                throw err;
            if (result.length > 0) {
                console.log(`Ingredient ${ingredient.name} already exists in database`);
                return;
            } else {
                // if ingredient does not exist in database insert it
                const insertIngredient = `INSERT INTO ingredient (name, glycemic_index, glycemic_charge) VALUES ('${ingredient.name}', '${ingredient.glycemic_index}', '${ingredient.glycemic_charge}')`;
                connection.query(insertIngredient, function (err, result) {
                    if (err)
                        throw err;
                    console.log(`Ingredient ${ingredient.name} inserted in database`);
                });
            }
            count++;
            if (count === total) {
                connection.end();
            }
        });
    });
});

fs.readFile('./data/roles.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    
    const roles = JSON.parse(data);

    let count = 0;
    const total = roles.length;

    roles.forEach(role => {
        // check if role already exists in database
        const checkRole = `SELECT * FROM role WHERE name = ('${role.name}')`;
        connection.query(checkRole, function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                console.log(`Role ${role.name} already exists in database`);
                return;
            } else {
                // if role does not exist in database insert it
                const insertRole = `INSERT INTO role (name) VALUES ('${role.name}')`;
                connection.query(insertRole, function (err, result) {
                    if (err) throw err;
                    console.log(`Role ${role.name} inserted in database`);
                });
            }
            count++;
            if (count === total) {
                connection.end();
            }
        });        
    });
});