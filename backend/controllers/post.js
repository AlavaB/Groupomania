const db = require('../models');
const Post = db.post;


// Create and Save a new Post
exports.createPost = (req, res, next) => {
  
  const post = {// Create a Post
    content: req.body.content,
    image: req.body.image,
    user_id: req.body.user_id,
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
function comment(array) {
  allComments = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    commentFormat = {
      id: element.id,
      content: element.content,
      pseudo: element.user.pseudo,
      userId: element.user.id,
      creationDate: element.created_at
    };
    allComments.push(commentFormat);
  }
  return allComments;
}


// Find all Posts 
exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    order: [["created_at", "DESC"]],
    include: [{
      model: db.comment, 
      include: [{
        model: db.user
      }]
      }, {
        model: db.user
      }]
  })

    .then(posts => {
      const resObj = posts.map(post => {
        //tidy up the user data
        return Object.assign(
          {},
          {
            id: post.id,
            content: post.content,
            user: post.user.pseudo,
            userId: post.user.id,
            creationDate: post.created_at,
            image: post.image,
            comments: comment(post.comments)
          })

      });
      res.json(resObj)
    })

};


exports.modifyPost = (req, res, next) => {
  console.log(req.body)

  Post.update({
    content: req.body.content,
    image: req.body.image
  }, {
    where: { id: req.params.id },
    returning: true,//Option to tell Sequelize to return the post
    plain: true//To return the post itself 
  })
    .then(() => res.status(200).json({ message: "Post modifié !" }))
    .catch(error => res.status(404).json(error));
};

exports.deletePost = (req, res, next) => {console.log(req.params.id);
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
  
  .then(() => res.status(200).json({ message: "Post supprimé !" }))
  .catch(error => res.status(404).json(error));
}