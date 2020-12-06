module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        content: {
            type: DataTypes.STRING, allowNull: true
        },
        image: {
            type: DataTypes.STRING, allowNull: true
        },
        post_id: {
            type: DataTypes.INTEGER, allowNull: true, references: {
                model: 'posts',
                key: 'id'
            }  
        }
    });
  
    return Comment;
};
