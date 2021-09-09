
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        //On prend le token de la requete
        const token = req.headers.authorization.split(' ')[1];
        //console log niveau back
        console.log('console log niveau backend du token', token)
        if (!token) {
            return res.status(500).json({error:'token inexistant'})
        }
        //On le decode grâce au TOKEN SECRET
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        //On extrait l'user id du TOKEN
        const userId = decodedToken.userId;
        //On le compare avec celui de la requete
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';

        } else {
            next(); //Si il est juste on passe au middleware suivant
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};