// Fonction concernant le Login, Signup, Acces aux infos d un utilisateur, 
// suppression d un utilisateur et Like d'une publication.

// Le role d'un utilisateur est : 
// 0 : s'il a créé un compte mais n'est pas encore modéré.
// 1 : s'il est modéré, et peut donc avoir accés aux fonctionnalités de base
// (Creer un Article, un Commentaire, liker, modifier/supprimer sa publication ou
// supprimer son compte)
// 2 : s'il est Administrateur. Il pourra modérer les publicaitons,
// et avoir accés aux statistiques de l'applicaiton. Aussi , l'administateur n'a pas 
// à moderer ses propres publications. 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const jwtoken = require('../utils/jwtoken');
const checkInput = require('../utils/checkInput');

const User = require('../models/User')

//Creation d un compte en cryptant password, creer un nouvel utilisateur et enregistre données.
exports.signup = (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;
  if (email == null || lastName == null || firstName == null || password == null) {
      res.status(400).json({ error: 'Tous les champs sont obligatoires' })
  }
  //Vérification inputs user par path => utils/checkinputs.js
  let emailOK = checkInput.validEmail(email);
      if (emailOK == true) {
          //Vérification si utilisateur n'existe pas déjà
          User.findOne({
              attributes: ['email'],
              where: { email: email }
          })
          .then(user => {
              if (!user) {
                  bcrypt.hash(password, 10, function (error, hash) {
                      //Création user
                      User.create({
                          firstName: firstName,
                          lastName: lastName,
                          password: hash,
                          email: email
                      })
                          .then(userNew => { res.status(201).json({ 'Utilisateur créé ! Id': userNew.idUser }) })
                          .catch(err => {
                              res.status(500).json({ error })
                          })
                  })
              } else {
                  res.status(400).json({ error: 'Cet utilisateur existe déjà' })
              }
          })
          .catch(error => { res.status(501).json({ error }) })
      } else {
          console.log('Erreur')
      }
};

//Connexion de l'utilisateur à son compte
exports.login = (req, res) => {
  //Récupération et validation des paramètres
  let email = req.body.email;
  let password = req.body.password;
      if (email == null || password == null) {
          res.status(400).json({ error: 'Il manque une information' })
      }
      //Utilisteur existe-t-il?
      User.findOne({
          where: { email: email }
      })
      .then(user => {
          if (user) {
              bcrypt.compare(password, user.password).then((valid) => {
                  if(!valid) {
                    res.status(403).json({ error: 'invalid password' });
                  } else {
                    res.status(200).json({
                      userId: user.id,
                      name: user.firstName,
                      admin: user.admin,
                      token: jwtoken.generateToken(user)
                    })
                  };
              })
          } else {
              res.status(404).json({ 'erreur': 'Cet utilisateur n\'existe pas' })
          }
      })
      .catch(err => { res.status(500).json({ err }) })
};

exports.deleteUser = (req, res) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                    res.status(400).json({ error: "Mot de passe incorrect" });
                    } else {
                        User.destroy({ where: { email: req.body.email } })
                            .then(() => res.status(200).json({ message: "Utilisateur supprimé de la base de données" }))
                            .catch(error => res.status(500).json({ error }));
                    }
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
};