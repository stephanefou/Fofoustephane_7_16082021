//Protege la route et check que user est identifie. 
//Potentiellement beaucoup de probleme, donc on utilise try/catch pour les exceptions des instructions executes
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Récupération du token dans le header de requête
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');// Décryptage du token avec clé renseignée
    const userId = decodedToken.userId;//UserId contenu dans le token
    //on verifie qu il y a userid ds requete et s il est != du token on Throw, sinon next()
    if ( !userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};