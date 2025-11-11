## Steps to setup the starter template

1. Clone the project

```
git clone https://github.com/akansha690/Doctor-Consultation-Backend-App.git <ProjectName>
```

2. Move in to the folder structure

```
cd <ProjectName>
```

3. Install npm dependencies

```
npm i
```

4. Create a new .env file in the root directory and add the `PORT` env variable

```
echo PORT=4000 >> .env
```

5. Start the express server

```
npm run dev
```

It is a microservice based Project. 
```

## Flow of a request

Client (Frontend / Postman)
        ↓
    Controller
        ↓
     Service
        ↓
   Repository
        ↓
   Database (via Sequelize)


```
# Controller Layer

   The Controller acts as the entry point for any API request.
   It receives requests from the client (such as GET, POST, etc.), extracts necessary data (from req.body, req.params, or req.query), and forwards that data to the Service layer.

# Service Layer

   It acts as a bridge between the Controller and the Repository.
   1. Validate inputs.
   2. Apply business rules (like checking if a doctor exists before creating a slot).
   3. Combine or transform data from multiple repositories.


# Repository Layer

   The Repository layer is responsible for database operations.
   It interacts directly with Sequelize models to perform findAll, findByPk, create, update, delete, etc.


# 1. Auth service 
   Handles user authentication, JWT token generation logic.
   API Gateway: Acts as the single entry point for all requests, routing them to appropriate microservices and ensuring secure communication between services.

# 2. Appointment Service:

   DoctorProfiles — store details like name, specialization, age, and education.

   AvailabilitySlots — manage each doctor’s available days and times.

   Bookings — patients can book slots with doctors.

   Filtering System — filter doctors by specialization or availability.

   Soft Deletion — logical deletion of records using deletedAt.

   Repository Pattern — for clean and reusable database logic.


# 3. Payment service 

   I integrated Razorpay payment gateway with the following features:

   1. Order creation and management.
   2. Webhook implementation for real-time payment notifications.
   3. Payment signature verification for security.
   4. Error handling and logging.

   For complete end-to-end testing, I would need a frontend checkout interface, but since this was a backend-focused project, I tested the order creation only.
   This service is production-ready and can handle payments once connected to a frontend checkout UI.


# Postman Documentation

https://documenter.getpostman.com/view/36220149/2sB3WsQKwU


