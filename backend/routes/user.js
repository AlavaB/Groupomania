module.exports = app => {
  const users = require('../controllers/user');
  const auth = require("../middleware/auth");

  var router = require('express').Router();

  //Create a new User
  router.post("/", users.createUser);
  router.post("/login", users.login);

  //Get all Users
  router.get("/", users.getAllUsers);//A voir pour supprimer si pas utile

  //Get one User
  router.get("/:id", users.getOneUser);//A voir pour supprimer si pas utile

  app.use('/api/users', router);
};