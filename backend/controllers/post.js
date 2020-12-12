const db = require('../models');
const Post = db.post;


// Create and Save a new Post
exports.createPost = (req, res, next) => {
  // Create a Post
  const post = {
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
function comment(array){
  allComments = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    commentFormat= {
      content: element.content,
      pseudo: element.user.pseudo,
      user_id: element.user.id,
      creation_date: element.created_at
    };
    allComments.push(commentFormat);
  }
  return allComments;
}
exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    order: [[ "created_at", "DESC" ]],
    include: [
    {model: db.comment,include: [
      {model: db.user
    }]
      },{model: db.user
      }]})

    .then(posts => { const resObj = posts.map(post => {
        //tidy up the user data
      return Object.assign(
        {},
        {
          post_content: post.content,
          post_user: post.user.pseudo,
          post_user_id: post.user.id,
          post_creation_date: post.created_at,
          post_image: post.image,
          comments_data: comment(post.comments)
        })
        
    });
    res.json(resObj) })

};



