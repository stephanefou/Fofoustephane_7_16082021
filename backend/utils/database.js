const { Client } = require('pg');

const client = new Client ({
    host: "localhost",
    port: 8200,
    user: "postgres",
    password: "T6FaNe95",
    database: "nom_base"
})

client.connect();

client.query(`select * from public.person` , (err, result) => { //On considère que nous somme déjà dans la database pour nom_base_public.person
    if(!err) {
        console.log(result.rows);
    }
    client.end();
})

//Sur cmd 
//      psql -h localhost -p 8200 -U postgres test
//sur sql shell (une fois connecté)
//      \c test