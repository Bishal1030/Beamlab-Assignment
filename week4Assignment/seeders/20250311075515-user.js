const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;

    // Hash the password
    const hashedPassword = await bcrypt.hash('bishal123', saltRounds);
    const userPassword = await bcrypt.hash('user123', 10);


    await queryInterface.bulkInsert("Users", [
      {
        name: "admin",
        email: "admin@example.com",
        password: hashedPassword, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { 
        name: 'user', 
        email: 'user@example.com', 
        password: userPassword, 
        createdAt: new Date(), 
        updatedAt: new Date() }
    ]);
  
  
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {

    
      await queryInterface.bulkDelete("Users", null, {});
    
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
