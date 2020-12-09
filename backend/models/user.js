module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      email: {
        type: DataTypes.STRING, allowNull: false, unique: true
      },
      pseudo: {
        type: DataTypes.STRING, allowNull: false, unique: true
      },
      password: {
        type: DataTypes.STRING, allowNull: false, unique: true
      },
      profil_picture: {
        type: DataTypes.STRING, allowNull: true
      },
      is_admin: {
        type: DataTypes.BOOLEAN, defaultValue: 0
      }
    });
  
    return User;
  };