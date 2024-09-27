module.exports = {
  /**
   * Creates the 'videos' table in the database.
   *
   * @param {Object} queryInterface - The query interface used for database operations.
   * @param {Object} Sequelize - The Sequelize library for defining data types.
   * @returns {Promise<void>} A promise that resolves when the table is created.
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('videos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      publishedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      thumbnailUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });

    await queryInterface.addIndex('videos', ['title']);
    await queryInterface.addIndex('videos', ['description']);
    await queryInterface.addIndex('videos', ['publishedAt']);
  },

  /**
   * Drops the 'videos' table from the database.
   *
   * @param {Object} queryInterface - The query interface used for database operations.
   * @returns {Promise<void>} A promise that resolves when the table is dropped.
   */
  down: async (queryInterface) => {
    await queryInterface.dropTable('videos');
  },
};
