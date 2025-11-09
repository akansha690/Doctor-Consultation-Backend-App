

import { QueryInterface } from "sequelize";

export async function up (queryInterface: QueryInterface) {
    
    await queryInterface.sequelize.query(
      `
        CREATE TABLE IF NOT EXISTS users(
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(100),
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          role ENUM('PATIENT', 'DOCTOR'), 
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,     
          deleted_at TIMESTAMP DEFAULT NULL 
        );
      
      `
    );
  }

export async function down (queryInterface: QueryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(
      `
       DROP TABLE IF EXISTS users;
      `
    )
  }
