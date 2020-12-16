const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../models');
const User = db.user;
const { secret } = require('../config.json');
const { oldEmployesPassword } = require('../config.json');

//Création d'un utilisateur
exports.createUser = (req, res, next) => {
  if (!req.body.email || !req.body.pseudo || !req.body.password) {
    res.status(400).send({ 
      message: "Echec de l'inscription, requête mal formulée"
     });
    return;
  } 
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = {
        email: req.body.email,
        pseudo: req.body.pseudo,
        password: hash,
        profil_picture: req.body.profil_picture,
        is_admin: req.body.is_admin
      }
      User.create(user)
        .then(() => { res.status(200).json({ 
          message: "Inscription réussie"
          }); 
        })
        .catch(err => res.status(400).send({ err }));
    })
    .catch(err => res.status(500).json({ err }));
};


// Récupérer un utilisateur
exports.getOneUser = (req, res, next) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(user => { res.status(200).json({
      admin: user.is_admin,
      userId: user.id,
      email: user.email,
      pseudo: user.pseudo,
      password: user.password,
      profilePicture: user.profile_picture
    }) 
  })
    .catch(err => res.status(500).json({ err }));
};

//Connexion d'un utilisateur existant
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ 
          message: "Echec de l'authentification"
        });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ 
              message: "Echec de l'authentification" 
            });
          }          
          res.status(200).json({ 
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              secret,
              {expiresIn: "24h"}
            )
          });
        })
        .catch(err => res.status(500).json({ err }));
    })
    .catch(err => res.status(500).json({ err }));
};

//Modification d'un utilisateur
exports.modifyUser = (req, res, next) => {
  let password
  if (req.body.password){
    bcrypt.hash(req.body.password, 10)
  .then(hash => {password = hash;})
  }
    User.update({
      email: req.body.email,
      pseudo: req.body.pseudo,
      password,
      profil_picture: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      is_admin: req.body.is_admin
  }, {
    where: { id: req.params.id },
    returning: true,
    plain: true
  })
    .then(() => res.status(200).json({ message: "Utilisateur modifié" }))
    .catch(err => res.status(404).json({ err }));
};

//Suppression d'un utilisateur
exports.deleteUser = (req, res, next) => {
  User.update({
    email: 'ancien employé' + Date.now(),
    pseudo: 'ancien employé',
    password: oldEmployesPassword,
    profil_picture: "http://localhost:3000/api/images/avatar.png",
    is_admin: 0
}, {
  where: { id: req.params.id },
  returning: true,
  plain: true
})

  .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
  .catch(err => res.status(404).json({ err }));
};

