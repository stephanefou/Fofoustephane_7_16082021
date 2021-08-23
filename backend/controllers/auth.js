require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//suppression crypto

const DB = require('../utils/database');

exports.signup = (req, res, next) => {
  //Cryptage Email
  const buffer = Buffer.from(req.body.email);
  const cryptedEmail = buffer.toString('base64');
  /*const cryptedEmail = req.body.email;*/
  //Verification email disponible
  DB.query(`SELECT * FROM users WHERE email='${cryptedEmail}'`,
    (error, results, rows) => {
      //Si email deja utilisé
      if (results > 0) {
        res.status(401).json({message: 'Email non disponible.'});
      //Si email disponible
      } else {
      //Cryptage du MDP et ajout à la BDD (id, username, firstname, lastname, email, password, pictureUrl, bio, isAdmin)
      const user = req.body
      bcrypt.hash(user.password, 10).then((hash) => {
        DB.query(
          `INSERT INTO users VALUES (
            nextval('users_id_seq'::regclass),
            '${req.body.username}',
            '${req.body.firstname}',
            '${req.body.lastname}',
            '${cryptedEmail}',
            '${hash}',
            NULL,
            NULL,
            0
          )`,
          (error, results, fields) => {
            if (error) {
              console.log(error);
              return res.status(400).json("erreur");
            } 
            return res.status(201).json({message: 'Votre compte a bien été crée !'});
          }
        );
      })
      .catch(error => res.status(500).json({error}));
    }
  });
};