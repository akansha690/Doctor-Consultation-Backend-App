import { QueryInterface } from "sequelize"

export async function up (queryInterface: QueryInterface) {
   

     await queryInterface.sequelize.query( 
      `
        CREATE TABLE IF NOT EXISTS bookings(
          id INT AUTO_INCREMENT PRIMARY KEY,
          patient_id INT NOT NULL,
          doctor_id INT NOT NULL,
          availability_id INT NOT NULL,
          price INT NOT NULL,
          status ENUM('PENDING', 'BOOKED', 'CANCELLED') DEFAULT 'PENDING',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted_at TIMESTAMP DEFAULT NULL,
          FOREIGN KEY(doctor_id) REFERENCES doctorProfiles(id) ON DELETE CASCADE ON UPDATE CASCADE,
          FOREIGN KEY(availability_id) REFERENCES availabilitySlots(id) ON DELETE CASCADE ON UPDATE CASCADE

        );   
      `
     );
  }

 export async function down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `
        DROP TABLE IF EXISTS bookings;
      `
    );
  };

