import { QueryInterface } from "sequelize"


export async function up (queryInterface: QueryInterface) {
   

     await queryInterface.sequelize.query( 
      `
        CREATE TABLE IF NOT EXISTS doctorProfiles(
          id INT AUTO_INCREMENT PRIMARY KEY,
          full_name VARCHAR(255) NOT NULL,
          age INT,
          specialisation VARCHAR(255) NOT NULL,
          education TEXT NOT NULL,
          consultation_fee VARCHAR(100) NOT NULL,
          experience INT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,     
          deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP     
        );   
      `
     );
  }

export async function down (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `
        DROP TABLE IF EXISTS doctorProfiles;
      `
    )
  }

