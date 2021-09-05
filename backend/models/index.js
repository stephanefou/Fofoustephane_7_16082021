////Connexion sequelize à la base de données
'use strict';
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize"); //module
require('dotenv').config();
const basename = path.basename(__filename);
const db = {};

//Information pour se connecter
//Creation d une instance sequelize en passant les parametres de connexion separement
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, //localHost
  port: process.env.DB_PORT,
  dialect: 'postgres',
  charset : 'utf8_general_ci'
});

//Etablir la connexion 
sequelize.authenticate()
  .then(() => console.log('La connexion est établie.'))
  .catch((error) => ('La connexion a échoué', error));


module.exports = sequelize;
