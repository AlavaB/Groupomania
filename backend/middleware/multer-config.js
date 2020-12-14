const multer = require("multer");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
};

const storage = multer.diskStorage({//création d'objet de configuration pour multer
    destination: (req, file, callback) => {//1er élément indique dans quel dossier enregister les fichiers 
        callback(null, "images")
    },
    filename: (req, file, callback) => {//2ème élément qui explique quel nom utiliser 
        const name = file.originalname.split(" ").join("_");//éliminer les espaces
        const extension = MIME_TYPES[file.mimetype];//appliquer une extension au fichier
        callback(null, name + Date.now() + "." + extension);//création du filename vace timestamp pour le rendre unique
    }
});


module.exports = multer({ storage }).single("image");