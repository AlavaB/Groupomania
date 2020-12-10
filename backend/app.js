const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require("jsonwebtoken");

const app = express();

const db = require('./models/index');
db.sequelize.sync({ force: false }) 
    .then(() => {
    console.log("Synchronisation de la base de données");
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Emilie application." });
  });

require('./routes/user')(app);
require('./routes/post')(app);
require('./routes/comment')(app);

/*const posts = function(posts) {
  this.content = posts.content;
  this.image = posts.image;
  this.user_id = posts.user_id;
};
console.log(posts.content);*/

module.exports = app;