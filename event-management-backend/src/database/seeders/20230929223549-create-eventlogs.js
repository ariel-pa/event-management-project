'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let eventlogs = [
      {
        registration_date: new Date(),
        user_id: 2,
        event_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        registration_date: new Date(),
        user_id: 1,
        event_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    /**
     * Add seed commands here.
    */
    return await queryInterface.bulkInsert('EventLogs', eventlogs, {});
  },

  async down(queryInterface, Sequelize) {
    /**
 * Add seed commands here.
*/
    return await queryInterface.bulkInsert('EventLogs', eventlogs, {});
  }
};
