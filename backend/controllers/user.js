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
  const user = {
    email: req.body.email,
    pseudo: req.body.pseudo,
    password: req.body.password,
    profil_picture: req.body.profil_picture,
    is_admin: req.body.is_admin
  };
console.log(user);
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