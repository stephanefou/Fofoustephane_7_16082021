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
      //Cryptage du MDP et ajout à la BDD (id, firstname, lastname, email, password, pictureUrl, bio, isAdmin)
      const user = req.body
      bcrypt.hash(user.password, 10).then((hash) => {
        DB.query(
          `INSERT INTO users VALUES (
            nextval('users_id_seq'::regclass), --increment commentaire
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
              return res.status(201).json({message: 'Votre compte a bien été créé !'});
            }
        );
      })
      .catch(error => res.status(500).json({error}));
    }
  });
};

//Connexion
exports.login = (req, res, next) => {
  const buffer = Buffer.from(req.body.email);
  const cryptedEmail = buffer.toString('base64');
  console.log(cryptedEmail);
  //Recherche de l'utilisateur dans la BDD
  DB.query(`SELECT * FROM users WHERE email='${cryptedEmail}'`,
    (err, results, rows) => {
      //Si utilisateur trouvé : 
      if (results.length > 0) {
        //Verification du MDP
        bcrypt.compare(req.body.password, results[0].password).then((valid) => {
          //Si MDP invalide erreur
          if (!valid) {
            res.status(401).json({message: 'Mot de passe incorrect.'});
          //Si MDP valide création d'un token
          } else {
            res.status(200).json({
              userId: results[0].id,
              nom: results[0].nom,
              prenom: results[0].prenom,
              token: jwt.sign({userId: results[0].id}, process.env.TOKEN, {expiresIn: '24h'})
            });
          }
        });
      } else {
        res.status(404).json({message: 'Utilisateur inconnu.'});
      }
    }
  );
};

// Delete User
exports.deleteUser = (req, res, next) => {
  DB.query(`DELETE FROM users WHERE users.id = ${req.params.id}`,
    (error, result, field) => {
      if (error) {
        return res.status(400).json({
            error
        });
      }
      return res.status(200).json(result);
  });
};