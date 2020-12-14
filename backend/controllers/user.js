const bcrypt = require("bcrypt");//Package de cryptage pour les mots de passe
const jwt = require("jsonwebtoken");
const db = require('../models');
const User = db.user;
const { secret } = require('../config.json');

const Op = db.Sequelize.Op;

// Create and Save a new User
exports.createUser = (req, res, next) => {
  if (!req.body.email) {
    res.status(400).send({ 
      title: "Vous devez renseignez une adresse email",
      error: "Echec de l'inscription"
     });
    return;
  } else if (!req.body.password) {
    res.status(400).send({ 
      title: "Vous devez renseigner un mot de passe",
      error: "Echec de l'inscription"
    });
    return;
  }

  // Create a User
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = {// Create a User
        email: req.body.email,
        pseudo: req.body.pseudo,
        password: hash,
        profil_picture: req.body.profil_picture,
        is_admin: req.body.is_admin
      }
      // Save User in the database
      User.create(user)
        .then(() => { res.status(200).json({ 
          message: "Inscription réussie"
          }); 
        })
        .catch(error => res.status(40).send({ 
            title: error
            //error: "Echec de l'inscription"
        }));
    })
    .catch(error => res.status(500).json({ 
      title: "Erreur serveur",
      error: error  
    }));
};

// Get all Users from the database
exports.getAllUsers = (req, res, next) => {
  /*const email = req.query.email;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;*/

  User.findAll({include: [
    {model: db.post,
      include: [
        {model: db.comment
      }]}
  ]})
  .then(users => { const resObj = users.map(user => {

      //tidy up the user data
      return Object.assign(
        {},
        { user_id: user.id,
          pseudo: user.pseudo,
          email: user.email,
          picture: user.profil_picture,
          admin: user.is_admin,
          posts: user.posts.map(post => {

            //tidy up the post data
            return Object.assign(
              {},
              {
                post_id: post.id,
                user_id: post.user_id,
                content: post.content,
                image: post.image,
                creation_date: post.created_at,
                comments: post.comments.map(comment => {

                  //tidy up the comment data
                  return Object.assign(
                    {},
                    {
                      comment_id: comment.id,
                      post_id: comment.post_id,
                      user_id: comment.user_id,
                      content: comment.content,
                      creation_date: comment.created_at
                    }
                  )
                })
              }
              )
          })
        }
      )
    });
    res.json(resObj)
  });
  /*
    .then(data => { res.send(data) })
    .catch(err => {
      res.status(500).send({ message: "Erreur serveur" });
    });
    */
};

// Get a single User with an id
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
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {//Fonction login pour connecter des users existants
  
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ 
          title: "Utilisateur non trouvé",
          error:  "Identification non valide"
        });
      }
      bcrypt.compare(req.body.password, user.password)//Comparaison du mot de passe avec bcrypt et la fonction compare
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ 
              title: "Utilisateur non trouvé",
              error: "Identification non valide" 
            });
          }
          //delete res.config.data.password;
          
          res.status(200).json({//Requête OK 
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              secret
            )
          });
        })
        .catch(error => res.status(500).json({ 
          title: "Erreur serveur",
          error: error 
        }));
    })
    .catch(error => res.status(500).json({ 
      title: "Erreur serveur",
      error: error 
    }));
};

exports.modifyUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    User.update({
      email: req.body.email,
      pseudo: req.body.pseudo,
      password: hash,
      profil_picture: req.body.profil_picture,
      is_admin: req.body.is_admin
  },{
    where: { id: req.params.id },
    returning: true,//Option to tell Sequelize to return the post
    plain: true//To return the post itself 
  })
  })
    .then(() => res.status(200).json({ message: "Utilisateur modifié" }))
    .catch(error => res.status(404).json(error));
};

exports.deleteUser = (req, res, next) => {console.log(req.params);
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
  .catch(error => res.status(404).json(error));
}

