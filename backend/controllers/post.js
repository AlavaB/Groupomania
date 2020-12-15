const db = require('../models');
const Post = db.post;

// Création d'un post
exports.createPost = (req, res, next) => {
  const post = {
    content: req.body.content,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    user_id: req.body.user_id,
  };
  Post.create(post)
    .then(data => { res.send(data) })
    .catch(err => res.status(500).json({ err }));
};

// Récupération d'un post selon id
exports.getOnePost = (req, res, next) => {
  const id = req.params.id;
  Post.findByPk(id)
    .then(data => { res.send(data) })
    .catch(err => res.status(500).json({ err }));
};

// Récupération de tous les posts
exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    order: [["created_at", "DESC"]],
    include: [{
      model: db.user
    }]
  })
    .then(posts => {
      const postObject = posts.map(post => {
        return Object.assign(
          {
            id: post.id,
            content: post.content,
            user: post.user.pseudo,
            userId: post.user.id,
            creationDate: post.created_at,
            image: post.image,
          })
      });
      res.status(200).json(postObject)
    })
    .catch(err => res.status(500).json(err))
};

//Modification d'un post
exports.modifyPost = (req, res, next) => {
  Post.update({
    content: req.body.content,
    image: req.body.image
  },
    {
      where: { id: req.params.id },
      returning: true,//Option Sequelize qui permet de retourner le post
      plain: true
    })
    .then(() => res.status(200).json({ message: "Post modifié !" }))
    .catch(err => res.status(404).json({ err }));
};

//Suppression d'un post
exports.deletePost = (req, res, next) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(200).json({ message: "Post supprimé !" }))
    .catch(err => res.status(404).json({ err }));
};