const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("admins", [
      {
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", 10), // Hash password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {

       return queryInterface.bulkDelete("admins", { email: "admin@example.com" }, {});
  }
};
