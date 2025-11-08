
import { QueryInterface } from "sequelize";

export async function up (queryInterface: QueryInterface) {
   
   await queryInterface.bulkInsert('doctorProfiles', [
    {
          full_name: 'Dr. Arjun Mehta',
          age: 42,
          specialisation: 'Cardiologist',
          education: 'MD in Cardiology, AIIMS Delhi',
          consultation_fee: 1200,
          experience: 15,
          deleted_at: null,
          created_at: new Date(),
          updated_at: new Date(),
    },
  {
    full_name: 'Dr. Priya Sharma',
    age: 35,
    specialisation: 'Dermatologist',
    education: 'MD in Dermatology, Maulana Azad Medical College',
    consultation_fee: 800,
    experience: 10,
    deleted_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    full_name: 'Dr. Rohan Patel',
    age: 45,
    specialisation: 'Orthopedic Surgeon',
    education: 'MS in Orthopedics, PGI Chandigarh',
    consultation_fee: 1000,
    experience: 18,
    deleted_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    full_name: 'Dr. Sneha Iyer',
    age: 38,
    specialisation: 'Neurologist',
    education: 'DM in Neurology, JIPMER Pondicherry',
    consultation_fee: 1500,
    experience: 12,
    deleted_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    full_name: 'Dr. Rajesh Nair',
    age: 50,
    specialisation: 'General Physician',
    education: 'MBBS, MD in General Medicine, Grant Medical College Mumbai',
    consultation_fee: 600,
    experience: 25,
    deleted_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
    
   ])
  };

  export async function down (queryInterface: QueryInterface) {
    
      await queryInterface.bulkDelete('doctor_profiles', {}, {});
  };

