  'use strict';
module.exports = (sequelize, DataTypes) => { //Appel sequelize
  // Création du modèle 'User'
  const User = sequelize.define('User', {
      firstName: {
          type: DataTypes.STRING,
          allowNull: false
      },
      lastName: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
          type: 'VARBINARY(50)',
          allowNull: false,
          unique: true
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "http://127.0.0.1:3000/images/avatars/default_user.jpg"
      },
      isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      }
  });
  // Création de la table 'users'
  User.sync()
  .then(() => console.log("The table for the User model is created"))
  .catch(error => console.log(error));

  return User;
}


