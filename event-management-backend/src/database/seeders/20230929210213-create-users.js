'use strict';
const { encrypt } = require("./../../helpers/handlePassword");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "123"
    const passwordHash = await encrypt(password);
    let users = [
      {
        firstName:'Juan',
        lastName: 'Cortez Davalos',
        email: 'juan@gmail.com',
        password: passwordHash,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName:'Maria',
        lastName: 'Flores Lopez',
        email: 'maria@gmail.com',
        password: passwordHash,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    /**
     * Add seed commands here.
    */
   return await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.   
     */
    return await queryInterface.bulkDelete('Users', null, {});
  }
};
