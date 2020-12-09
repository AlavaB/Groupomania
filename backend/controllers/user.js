const bcrypt = require("bcrypt");//Package de cryptage pour les mots de passe
const jwt = require("jsonwebtoken");
const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.createUser = (req, res) => {
    if (!req.body.email) {
        res.status(400).send({
        message: "Vous devez renseignez une adresse email"
        });
        return;
      } else if (!req.body.pseudo) {
        res.status(400).send({
          message: "Vous devez renseignez un pseudo"
          });
          return;
        } else if (!req.body.password) {
          res.status(400).send({
            message: "Vous devez renseignez un mot de passe"
            });
            return;
          }

  // Create a User
  bcrypt.hash(req.body.password, 10)
      .then(hash => { 
          // Create a User
          const user = {
            email: req.body.email,
            pseudo: req.body.pseudo,
            password: hash,
            profil_picture: req.body.profil_picture,
            is_admin: req.body.is_admin
          }

          // Save User in the database
          User.create(user)
            .then(data => {
            res.send(data);
          })
            .catch(err => {
            res.status(500).send({
            message:
            err.message || "Erreur serveur"
      });
    });
  })
      .catch(error => res.status(500).json({error}));
};

// Get all Users from the database
exports.getAllUsers = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur serveur."
        });
      });
};

// Get a single User with an id
exports.getOneUser = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur serveur"
        });
      });
};

exports.login = (req, res, next) => {//Fonction login pour connecter des users existants
  
User.findOne({where: {email: req.body.email}})
      .then(user => {
        
          if (!user) {
              return res.status(401).json({error: "Utilisateur non trouvé !"});   
          }
          bcrypt.compare(req.body.password, user.password)//Comparaison du mot de passe avec bcrypt et la fonction compare
              .then(valid => {
                  if (!valid) {
                      return res.status(401).json({error: "Mot de passe incorrect !"})
                  }
                  res.status(200).json({//Requête OK 
                      userId: user._id,
                      token: jwt.sign(
                          {userId: user._id},
                          "RANDOM_TOKEN_SECRET",
                          {expiresIn: "24h"}
                      )
                  });
              })
              .catch(error => res.status(500).json({error}));//Erreur serveur
      })
      .catch(error => res.status(500).json({error}));//Erreur serveur
};