'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.belongsToMany(models.User, { through: models.userRole, foreignKey: "roleId", as: "users" });

      // define association here
    }
  }
  Role.init({
    roleName: {
      type: DataTypes.ENUM("User", "Admin"),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};