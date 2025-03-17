'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userRole extends Model {

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userRole.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      userRole.belongsTo(models.Role, { foreignKey: "roleId", as: "role" }); 



   
      // define association here
    }
  }
  userRole.init({
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "Users", key: "id" },

    },
    roleId: {
      type: DataTypes.INTEGER,
      references: { model: "Roles", key: "id" },

    }
  }, {
    sequelize,
    modelName: 'userRole',
    tableName: 'userroles'
  });
  return userRole;
};