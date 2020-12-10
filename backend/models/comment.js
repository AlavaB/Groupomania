module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        id: {
            type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4, primaryKey: true, unique: true//UUID = unique user identifier, généré par Sequelize automatiquement
        },
        content: {
            type: DataTypes.STRING, allowNull: false
        },
        post_id: {
            type: DataTypes.UUID, allowNull: false, references: {
                model: 'posts',
                key: 'id'
            }
        }, 
        user_id: {
            type: DataTypes.UUID, allowNull: false, references: {
                model: 'users',
                key: 'id'
            }
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

    return Comment;
};
