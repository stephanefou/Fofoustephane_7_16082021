require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//suppression crypto

const db = require('../utils/database');

exports.signup = (req, res, next) => {
  //Cryptage Email
  const buffer = Buffer.from(req.body.email);
  const cryptedEmail = buffer.toString('base64');
  //Verification email disponible
  db.query(`SELECT * FROM "Users" WHERE email='${cryptedEmail}'`,
    (error, results, rows) => {
      //Si email deja utilisé
      console.log(results[0]);
      if (results > 0) {
        res.status(401).json({message: 'Email non disponible.'});
      //Si email disponible
      } else {
        //Cryptage du MDP et ajout à la BDD (id, firstname, lastname, email, password, pictureUrl, bio, isAdmin)
        bcrypt.hash(req.body.password, 10).then((hash) => {
          db.query(
            `INSERT INTO "Users" VALUES (
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
    }
  );
};

//Connexion
exports.login = (req, res, next) => {
  const email = req.body.email;
  console.log(email);
  //Recherche de l'utilisateur dans la BDD
  db.query(`SELECT * FROM "Users" WHERE email = 'stef3@gmail.com'`,
    (err, results, rows) => {
      //Si utilisateur trouvé :
      rows = results.rows;
      console.log(results);
      console.log(results.rows);
      console.log(rows.length);
      console.log(results.length);
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
              admin: results[0].admin,
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
  db.query(`DELETE FROM users WHERE users.id = ${req.params.id}`,
    (error, result, field) => {
      if (error) {
        return res.status(400).json({
            error
        });
      }
      return res.status(200).json(result);
  });
};