const mysql = require("mysql");
const fs = require("fs");

const connection = mysql.createConnection({
    host: process.env.SECRET_HOST,
    user: process.env.SECRET_USER,
    port: process.env.SECRET_PORT,
    password: process.env.SECRET_PASSWORD,
    database: process.env.SECRET_DATABASE,
    connectTimeout: 30000,
});

connection.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL Database");
});

// function to check if datas already exist in database
function checkIfExistInDb(table, name) {
    return new Promise((resolve, reject) => {
        const check = `SELECT * FROM ${table} WHERE name = ('${name}')`;
        connection.query(check, function (err, result) {
            if (err) reject(err);
            if (result?.length > 0) {
                console.log(`${table} ${name} already exists in database`);
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

// function to insert ingredients in database
function insertIngredient(ingredient) {
    return new Promise((resolve, reject) => {
        const insert = `INSERT INTO Ingredient (name, glycemic_index, glycemic_charge) VALUES ('${ingredient.name}', '${ingredient.glycemic_index}', '${ingredient.glycemic_charge}')`;
        connection.query(insert, function (err, result) {
            if (err) reject(err);
            console.log(`Ingredient ${ingredient.name} inserted in database`);
            resolve(true);
        });
    });
}

// function to insert roles in database
function insertRole(role) {
    return new Promise((resolve, reject) => {
        const insert = `INSERT INTO Role (name) VALUES ('${role.name}')`;
        connection.query(insert, function (err, result) {
            if (err) reject(err);
            console.log(`Role ${role.name} inserted in database`);
            resolve(true);
        });
    });
}

// function to insert diabetes types names into Account table in database
function insertDiabetesTypes(diabetes_type) {
    return new Promise((resolve, reject) => {
        const insert = `INSERT INTO Account (diabetes_type) VALUES ('${diabetes_type}')`;
        console.log(insert);
        connection.query(insert, function (err, result) {
            if (err) reject(err);
            console.log(`Diabetes type ${diabetes_type} inserted in database`);
            resolve(true);
        });
    });
}

// function for read json file and insert datas in database if they do not exist
async function readAndInsert(table, file) {
    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const datas = JSON.parse(data);

        datas.forEach(async data => {
            // check if data or column already exist in database
            const exist = await checkIfExistInDb(table, data.name);
            if (!exist) {
                // insert data in database
                if (table === "Ingredient") {
                    await insertIngredient(data);
                } else if (table === "Role") {
                    await insertRole(data);
                } else if (table === "Account") {
                    await insertDiabetesTypes(data);
                } else {
                    console.log("Error: table name is not valid");
                }
            }
        });
    });
}

// call function for ingredients and roles
readAndInsert("Ingredient", "./data/ingredients.json");
readAndInsert("Role", "./data/roles.json");
readAndInsert("Account", "./data/diabetes_type.json");
