

import { QueryInterface } from "sequelize";

export async function up (queryInterface: QueryInterface) {
    
    await queryInterface.sequelize.query(
      `
        CREATE TABLE IF NOT EXISTS payments(
          id INT AUTO_INCREMENT PRIMARY KEY,
          booking_id INT NOT NULL, 
          patient_id INT NOT NULL,
          amount INT NOT NULL,
          status ENUM('SUCCESS', 'FAILED', 'PENDING') DEFAULT 'PENDING',
          razorpay_order_id VARCHAR(255) DEFAULT NULL,
          razorpay_payment_id VARCHAR(255) DEFAULT NULL,
          razorpay_signature VARCHAR(255) DEFAULT NULL,
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
       DROP TABLE IF EXISTS payments;
      `
    )
  }
