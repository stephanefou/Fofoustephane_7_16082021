require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

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
exports.login = (req, res) => {
  if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Tous les champs doivent être remplis" });
  }
  
  if (req.body.email) {
      User.findOne({ where: { email: req.body.email } })
          .then(user => {
              if (user) {
                  bcrypt.compare(req.body.password, user.password)
                      .then(valid => {
                          if (!valid) {
                              res.status(401).json({ error: "Mot de passe incorrect" });
                          } else {
                              res.status(200).json({ 
                                  firstname: user.firstname,
                                  admin: user.admin,
                                  token: jwt.sign({ userId: user.id }, 'Gq8SZFSVIehzomW9QSjRUZ7Vlc5ykogXJMebbe3M', { expiresIn: '24h' }) 
                              });
                          }
                      })
                      .catch(error => res.status(500).json({ error }));
              } else {
                  res.status(401).json({ error: "Connexion refusée" });
              }
          })
          .catch(error => res.status(500).json({ error }))
  } else {
      res.status(401).json({ error: "Mot de passe incorrect" });
  }
};

// Delete User
exports.deleteUser = (req, res, next) => {
  db.query(`DELETE FROM "Users" WHERE users.id = ${req.params.id}`,
    (error, result, field) => {
      if (error) {
        return res.status(400).json({
            error
        });
      }
      return res.status(200).json(result);
  });
};