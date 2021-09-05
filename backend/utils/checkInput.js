//vérification des inputs des users
module.exports = {
  validEmail: function (value) {
      const regexEmail = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;
      return regexEmail.test(value)
  },
  validPassword: function (value) {
      //6 caractères dont au minimum une majuscule, une minuscule et un caractère numérique
      const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/
      return regexPassword.test(value)
  },
  validUsername: function (value) {
      const usernameRegex = /^[a-zA-Z ,.'-]+$/;
      return usernameRegex.test(value)
  }
}