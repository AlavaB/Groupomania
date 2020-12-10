module.exports = {
    //MySQL connection
    HOST: "localhost",
    USER: "groupomania",
    PASSWORD: "knutR66t-st",
    DB: "groupomania",
    dialect: "mysql",

    //Sequelize connection pool configuration
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

  