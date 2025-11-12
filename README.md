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


 # Complete Flow from register to booking a session with payment:


  ## User Registration

  **Endpoint** : POST http://localhost:PORT/api/v1/user/
    
   **Request Body:** 
   ```

   {
    "username":"Sakshi",
    "email": "sakshi56@gmail.com",
    "password":"mysecret123",
    "role":"PATIENT"
   }
   ```

   **Response Body:**
```

   {
    "message": "User registered successfully",
    "data": {
        "id": 9,
        "username": "Sakshi",
        "email": "sakshi56@gmail.com",
        "password": "$2b$10$oAb7XNjnTLl5wvJnHWOpBOsG1wtWbrZMx/MiGEXVGoSkjEAm2dHVe",
        "role": "PATIENT",
        "updatedAt": "2025-11-12T06:44:36.799Z",
        "createdAt": "2025-11-12T06:44:36.799Z"
    },
    "success": true
   }

```

 
## User Login

**Endpoint**  : GET http://localhost:PORT/api/v1/user/login

**Request Body:** 

```

{
   "email": "sakshi56@gmail.com",
    "password":"mysecret123"
}

```


**Response Body:** 
```

{
    "message": "User logged in successfully",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJzYWtzaGk1NkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IlNha3NoaSIsInJvbGUiOiJQQVRJRU5UIiwiaWF0IjoxNzYyOTMwMjQ1LCJleHAiOjE3NjMwMTY2NDV9.gZZN4DOXna-mT9NmCKFMOMHC6gA9OP7EGpASPnt7EtA",
    "success": true
}


```
Here, data is token gneerated by JWT token.


## Find a specific Doctor By Id

**Endpoint**  : GET /doctor/:doctorId

**Authorizartion(Header)** :
 Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJzYWtzaGk1NkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IlNha3NoaSIsInJvbGUiOiJQQVRJRU5UIiwiaWF0IjoxNzYyOTMwMjQ1LCJleHAiOjE3NjMwMTY2NDV9.gZZN4DOXna-mT9NmCKFMOMHC6gA9OP7EGpASPnt7EtA

This doctor will booked only if the 

**Response Body:** 

```
 None
```


**Response Body:** 

```
{
    "data": {
        "message": " Profile found successfully",
        "data": {
            "id": 1,
            "fullName": "Dr. Arjun Mehta",
            "age": 42,
            "specialisation": "Cardiologist",
            "education": "MD in Cardiology, AIIMS Delhi",
            "consultationFee": 1200,
            "experience": 15,
            "createdAt": "2025-11-08T11:49:31.000Z",
            "updatedAt": "2025-11-08T11:49:31.000Z",
            "deletedAt": null
        },
        "success": true
    },
    "success": true
}

```


## Find availability slot of a specific doctor you want to book

**Endpoint**  : GET /doctor/:doctorId

**Authorizartion(Header)** :
 Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJzYWtzaGk1NkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IlNha3NoaSIsInJvbGUiOiJQQVRJRU5UIiwiaWF0IjoxNzYyOTMwMjQ1LCJleHAiOjE3NjMwMTY2NDV9.gZZN4DOXna-mT9NmCKFMOMHC6gA9OP7EGpASPnt7EtA

**Request Body:**

```
{
    "day": "Wednesday",
    "date": "2025-11-20"
}


```


**Response Body:** 

```
{
    "data": {
        "message": "All Slots fetched successfully",
        "data": [
            {
                "id": 5,
                "doctorId": 1,
                "day": "Wednesday",
                "date": "2025-11-20T00:00:00.000Z",
                "isAvailable": true,
                "createdAt": "2025-11-12T08:01:13.000Z",
                "updatedAt": "2025-11-12T08:01:13.000Z",
                "deletedAt": null
            }
        ],
        "success": true
    },
    "success": true
}

```



## Booking a session with doctor

**Endpoint**  : POST /booking/

**Authorizartion(Header)** :
 Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJzYWtzaGk1NkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IlNha3NoaSIsInJvbGUiOiJQQVRJRU5UIiwiaWF0IjoxNzYyOTMwMjQ1LCJleHAiOjE3NjMwMTY2NDV9.gZZN4DOXna-mT9NmCKFMOMHC6gA9OP7EGpASPnt7EtA

**Request Body:**

```
{
    "doctorId": 1,
    "price":1200,
    "availabilityId" : 5
}

```


**Response Body:** 
```
{
    "data": {
        "message": "Booking created successfully",
        "data": {
            "status": "PENDING",
            "id": 9,
            "doctorId": 1,
            "patientId": "9",
            "availabilityId": 5,
            "price": 1200,
            "updatedAt": "2025-11-12T08:05:03.912Z",
            "createdAt": "2025-11-12T08:05:03.912Z"
        },
        "success": true
    },
    "success": true
}

```

## Payment for final Booking

**Endpoint**  : GET /payment/:bookingId

**Authorizartion(Header)** :
 Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJzYWtzaGk1NkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IlNha3NoaSIsInJvbGUiOiJQQVRJRU5UIiwiaWF0IjoxNzYyOTMwMjQ1LCJleHAiOjE3NjMwMTY2NDV9.gZZN4DOXna-mT9NmCKFMOMHC6gA9OP7EGpASPnt7EtA

**Request Body:**

```
None
```


**Response Body:** 
```

{
    "data": {
        "success": true,
        "data": {
            "amount": 120000,
            "amount_due": 120000,
            "amount_paid": 0,
            "attempts": 0,
            "created_at": 1762934896,
            "currency": "INR",
            "entity": "order",
            "id": "order_Rel0hMf1aQa3cb",
            "notes": [],
            "offer_id": null,
            "receipt": "booking_9",
            "status": "created"
        }
    },
    "success": true
}

```



# Postman Documentation

https://documenter.getpostman.com/view/36220149/2sB3WsQKwU


