const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'project_diabete',
    password: 'titrePro2023DSR',
    database: 'project_diabete'
});

if (connection) {
    console.log("Connected to MySQL database !");
};

// const jsonData = fs.readFile('./data/ingredients.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err)
//         return;
//     }
//     console.log(jsonData);

//     const ingredients = JSON.parse(data);

//     ingredients.forEach(ingredient => {
//         // create and increment id
        
//         const sql = `INSERT INTO ingredient (name, glycemic_index) VALUES ('${ingredient.name}', '${ingredient.glycemic_index}' )`;
//         connection.query(sql, function (err, result) {
//             if (err) throw err;
//             console.log("ingredients inserted into database !");
//         });
//     });

    connection.end();
// });

