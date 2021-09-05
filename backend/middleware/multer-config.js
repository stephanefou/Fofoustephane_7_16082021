  
////Acquisition des images pour les articles
////gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  "image/webp": "webp", //Ne fonctionne pas sur MAC
  "image/gif": "gif"
};
//storage: indique à multer où enregistrer les fichiers entrants 
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
//filename:  indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier. Elle utilise ensuite la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée  
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
//Export de l element configure , on passe storage et on gere seulement les telechargements de fichier image
module.exports = multer({storage: storage}).single('image');