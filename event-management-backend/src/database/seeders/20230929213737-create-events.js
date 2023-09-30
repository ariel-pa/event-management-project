'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let events = [
      {
        name: "Conversaciones Educativas sobre Tecnología",
        description: "Un evento educativo donde expertos discuten temas importantes relacionados con la tecnología. when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        event_date: "2023-11-02",
        place: "Barrio residencial #456",
        imagen: "file-1696035933918.jpg",
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Fiesta Anual de Éxito: Música, Baile y Delicias",
        description: "Una celebración llena de música, baile y comida deliciosa para celebrar el éxito del año. when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        event_date: "20243-10-08",
        place: "El Alto zona Sur #23 ",
        imagen: "file-1696035926594.jpg",
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // {
      //   name: "Revolución Industrial: La Presentación del Futuro",
      //   description: "Presentaremos nuestro último producto innovador que revolucionará la industria.",
      //   event_date: "2023-09-27",
      //   place: "Área metropolitana #78",
      //   imagen: "file-1696026250051.jpg",
      //   user_id: 1,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      {
        name: "Conexiones Profesionales: Forjando el Futuro Juntos",
        description: "Una oportunidad para conectarse con otros profesionales y compartir ideas para el futuro. when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        event_date: "2023-10-02",
        place: "Avenida de los Robles esquina orcullo",
        imagen: "file-1696035920392.jpg",
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ]

    /**
    * Add seed commands here.
   */
    return await queryInterface.bulkInsert('Events', events, {});
  },

  async down(queryInterface, Sequelize) {
    /**
   * Add seed commands here.
  */
    return await queryInterface.bulkInsert('Events', events, {});
  }
};
