require('dotenv').config();
const { Client } = require('pg');

const connection = new Client ({
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    charset : 'utf8_general_ci'
});

connection.connect();

module.exports = connection;

/*connection.query(`select * from public.person` , (err, result) => { //On considère que nous sommes déjà dans la database pour nom_base_public.person
    if(!err) {
        console.log(result.rows);
    }
    connection.end();
})*/

/*client.query(`select * from public.person` , (err, result) => { //On considère que nous sommes déjà dans la database pour nom_base_public.person
    if(!err) {
        console.log(result.rows);
    }
    client.end();
})*/