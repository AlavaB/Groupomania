module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4, primaryKey: true, unique: true//UUID = unique user identifier, généré par Sequelize automatiquement
    },
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
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    underscored: true
});

  return User;
};