module.exports = app => {
    const users = require('../controllers/user');
  
    var router = require('express').Router();
  
    //Create a new User
    router.post("/signup", users.signup);
    router.post("/login", users.login);

    //Get all Users
    router.get("/", users.getAllUsers);

    //Get one User
    //router.get("/:email", users.getOneUser);
  
    app.use('/api/users', router);
  };