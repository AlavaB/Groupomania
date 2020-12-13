module.exports = app => {
  const users = require('../controllers/user');
  const auth = require("../middleware/auth");

  const router = require('express').Router();

  //Create a new User
  router.post("/", users.createUser);
  router.post("/login", users.login);

  //Get all Users
  router.get("/", users.getAllUsers);//A voir pour supprimer si pas utile

  //Get one User
  router.get("/:id", auth, users.getOneUser);
  
  router.put('/:id', users.modifyUser);
  router.delete('/:id', users.deleteUser);

  app.use('/api/users', router);
};