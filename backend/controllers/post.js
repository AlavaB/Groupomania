const db = require('../models');
const Post = db.post;


// Create and Save a new Post
exports.createPost = (req, res, next) => {
  // Create a Post
  const post = {
    content: req.body.content,
    image: req.body.image,
    user_id: req.body.user_id
  };
  //Save Post in database
  Post.create(post)
    .then(data => { res.send(data) })
    .catch(error => res.status(500).json({ error }));
};

// Find a single Post with an id
exports.getOnePost = (req, res, next) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then(data => { res.send(data) })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
  Post.findAll({include: [
    {model: db.comment,
      },{model: db.user}]})

    .then(posts => { const resObj = posts.map(post => {
        //tidy up the user data
      return Object.assign(
        {},
        {
          post_id: post.id,
          content: post.content,
          user: post.user.pseudo,
          comments: post.comments,
          image: post.image,
          creation_date: post.created_at,
        })
    });
    res.json(resObj) })

};



