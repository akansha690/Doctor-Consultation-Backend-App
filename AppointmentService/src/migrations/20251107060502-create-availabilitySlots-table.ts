import { QueryInterface } from "sequelize"


/** @type {import('sequelize-cli').Migration} */
export async function up (queryInterface: QueryInterface) {
   

     await queryInterface.sequelize.query( 
      `
        CREATE TABLE IF NOT EXISTS availabilitySlots(
          id INT AUTO_INCREMENT PRIMARY KEY,
          doctor_id INT NOT NULL,
          date DATETIME NOT NULL,
          day VARCHAR(100) NOT NULL,
          is_available BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
          FOREIGN KEY(doctor_id) REFERENCES doctorProfiles(id) ON DELETE CASCADE ON UPDATE CASCADE   
        );   
      `
     );
}

export async function down (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `
        DROP TABLE IF EXISTS availabilitySlots;
      `
    )
}

