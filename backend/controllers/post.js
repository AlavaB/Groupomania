const db = require('../models');
const Post = db.post;
const Op = db.Sequelize.Op;

// Create and Save a new Post
exports.createPost = (req, res) => {
    
    // Create a Post
    const post = {
        content: req.body.content,
        image: req.body.image,
        user_id: req.body.user_id
    };
    //Save Post in database
    Post.create(post)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur serveur."
        });
    });
};

// Find a single Post with an id
exports.getOnePost = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur serveur"
      });
    });
};