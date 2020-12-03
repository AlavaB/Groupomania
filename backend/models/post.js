module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
        content: {
            type: DataTypes.STRING, allowNull: true
        },
        image: {
            type: DataTypes.STRING, allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER, allowNull: true, references: {
                model: 'users',
                key: 'id'
            }  
        }
    });
  
    return Post;
};

