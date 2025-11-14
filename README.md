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
   The Auth Service is a critical microservice in the Doctor Consultation Backend App responsible.
   1. Handles *user authentication*, JWT token generation logic.
   2. *API Gateway*: Acts as the single entry point for all requests, routing them to appropriate microservices and ensuring secure communication between services.

   **Key Responsibilities**

    1. User registration.
    2. Secure password hashing with bcrypt (salt rounds: 10)
    3. JWT token generation with configurable expiration.
    4. User authentication.(Login with email/password validation).
    5. Protected routes with Bearer token authentication.
    6. Error handling and validation

    Client (Frontend/Postman)
        ↓
    Controller
        ↓
    Service Layer
        ↓
    Repository Layer
        ↓
    Database (Sequelize ORM)

    ### Configure Environment Variables
        Add this in your .env file in the root directory

        ```
            PORT=4000
            DB_HOST=localhost
            DB_USER=root
            DB_PASSWORD=your_password
            DB_NAME=doctor_consultation_db
            JWT_SECRET=your_super_secret_jwt_key_here
            JWT_EXPIRY=24h
        ```

    ### Create database
    ```
        mysql -u root -p
        CREATE DATABASE doctor_consultation_db;
    ```

    ### Start the server

    ```
        npm run dev

    ```

    ##  API Endpoints

    1. User Registration
        Endpoint: POST /api/v1/user/
        Description: Register a new user with specified role

        ```
            {
            "username": "Sakshi",
            "email": "sakshi56@gmail.com",
            "password": "mysecret123",
            "role": "PATIENT"
            }

        ```

    Response body 


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

  2. User Login
        Endpoint: POST /api/v1/user/login
        Description: Authenticate user and generate JWT token

        ```

            {
            "email": "sakshi56@gmail.com",
            "password": "mysecret123"
            }


        ```

    Response 

    ```

        {
            "message": "User logged in successfully",
            "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJzYWtzaGk1NkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IlNha3NoaSIsInJvbGUiOiJQQVRJRU5UIiwiaWF0IjoxNzYyOTMwMjQ1LCJleHAiOjE3NjMwMTY2NDV9.gZZN4DOXna-mT9NmCKFMOMHC6gA9OP7EGpASPnt7EtA",
            "success": true
        }

    ```

    ## ApiGateway 

    The API Gateway(axios.ts file) serves as the single entry point for all client requests in the Doctor Consultation Backend microservices architecture. It handles request routing, forwarding, and provides a unified interface for multiple backend services.


    ## Add in .env file 
    **Microservice URLs(To forward requests to different services)**
        API_GATEWAY_URL=http://localhost:4000/api/v1
        PAYMENT_SERVICE_URL=http://localhost:4050/api/v1
        AUTH_SERVICE_URL=http://localhost:8080/api/v1

    **Purpose**

    1. Analyzes incoming request URL to determine target service.
    2. Modifies headers by removing host-specific headers.
    3. Forwards request to appropriate microservice.
    4. Returns response back to client/postman.

    ### All APIEndpoints of Auth service

    1. POST http://localhost:AUTH_SERVICE_PORT/api/v1/user/  ----->To Register a user
    2. POST http://localhost:AUTH_SERVICE_PORT/api/v1/user/login/  -----> To login a user

    For below endpoints, client need to provide token received in headers like this
    
    **Authorizartion(Header)** :
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJzYWtzaGk1NkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IlNha3NoaSIsInJvbGUiOiJQQVRJRU5UIiwiaWF0IjoxNzYyOTMwMjQ1LCJleHAiOjE3NjMwMTY2NDV9.gZZN4DOXna-mT9NmCKFMOMHC6gA9OP7EGpASPnt7EtA

    *This header provides all the info passed about the user ---> (x-user-id, x-user-role, x-user-username)*
    Gateway verifies tokens and adds custom headers that services can use it.
   

    3. POST http://localhost:AUTH_SERVICE_PORT/doctor/ ----->  Requests including '/doctor' -----> forwards to Appointment service  
    4. POST http://localhost:AUTH_SERVICE_PORT/slot/ ----->  Requests including '/slot' -----> forwards to Appointment service 
    5. POST http://localhost:AUTH_SERVICE_PORT/booking/ ----->  Requests including '/booking' -----> forwards to Appointment service 
    6. POST http://localhost:AUTH_SERVICE_PORT/payment/ ----->  Requests including '/booking' -----> forwards to Payment service. 



# 2. Appointment Service:

   DoctorProfiles — store details like name, specialization, age, and education.
   AvailabilitySlots — manage each doctor’s available days and times.

   Bookings — patients can book slots with doctors.

   Filtering System — filter doctors by specialization or availability.

   Soft Deletion — logical deletion of records using deletedAt.

   Repository Pattern — for clean and reusable database logic.

   ### All APIEndpoints of  Appointment Service:
    

   *Header is needed in all APIs* 
   **Authorizartion(Header)** :
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJzYWtzaGk1NkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IlNha3NoaSIsInJvbGUiOiJQQVRJRU5UIiwiaWF0IjoxNzYyOTMwMjQ1LCJleHAiOjE3NjMwMTY2NDV9.gZZN4DOXna-mT9NmCKFMOMHC6gA9OP7EGpASPnt7EtA

### /doctor endpoints:

    1. POST url_of_auth_service/doctor/
        To create a profile of Doctor.

    Request Body

    ```
        {
            "age": 39,
            "specialisation": "General Physician",
            "education": "MBBS, MD in General Medicine, Grand Medical College Delhi",
            "consultation_fee": "800",
            "experience": 5
        }

    ```

    2. GET url_of_auth_service/doctor/   
       To list all doctors 

    3. GET url_of_auth_service/doctor/<doctorId>
        To get a specific doctorProfile
       
    4. DELETE url_of_auth_service/doctor/delete/<doctorId>
        To delete the doctor's profile

    5. PATCH url_of_auth_service/doctor/update/<doctorId>
        To update the given field in request body.
        ```
            {
                "age":47,
                "fullName":"Dr. Rohan Kumar"
            }
        ```    


### /slot endpoints:

    *Header is needed in all APIs* 
   **Authorizartion(Header)** :
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJzYWtzaGk1NkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IlNha3NoaSIsInJvbGUiOiJQQVRJRU5UIiwiaWF0IjoxNzYyOTMwMjQ1LCJleHAiOjE3NjMwMTY2NDV9.gZZN4DOXna-mT9NmCKFMOMHC6gA9OP7EGpASPnt7EtA


    1. POST url_of_auth_service/slot/
        To create a slot.

    Request Body

    ```
        {
            "doctorId" : 1,
            "day": "Wednesday",
            "date": "2025-11-20",
            "isAvailable": true
        }

    ```

    2. GET url_of_auth_service/slot/<slotId>   
       To get a slot of id slotId. 

    3. DELETE url_of_auth_service/slot/delete/<slotId>
        To delete a slot with given slotId.

    4. PATCH url_of_auth_service/slot/update/<slotId>
        To update a slot with given fields in request body.
        ```
            {
                "day":"Friday"
            }
        ```    
    5. GET url_of_auth_service/slot/filter/<doctorId>
       To get all the slots of a doctor of id doctorId on a given day and date.


    ```
        {
            "day": "Wednesday",
            "date": "2025-11-20"
        }

    ```


### /booking endpoints:

    *Header is needed in all APIs* 
   **Authorizartion(Header)** :
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJzYWtzaGk1NkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IlNha3NoaSIsInJvbGUiOiJQQVRJRU5UIiwiaWF0IjoxNzYyOTMwMjQ1LCJleHAiOjE3NjMwMTY2NDV9.gZZN4DOXna-mT9NmCKFMOMHC6gA9OP7EGpASPnt7EtA


    1. POST url_of_auth_service/booking/
        To create a booking, Booking can only be made when the slot you want is available. For now, PENDING booking is created. Once payment is done, the status of booking is changed to BOOKED.

    Request Body

    ```
        {
            "doctorId": 1,
            "price":1200,
            "availabilityId" : 5
        }

    ```

    2. GET url_of_auth_service/booking/<bookingId>   
       To get a booking of id bookingId. 

    3. DELETE url_of_auth_service/booking/delete/<bookingId>
        To delete a booking with given bookingId.

    4. PATCH url_of_auth_service/booking/update/<bookingId>
        To update a booking with given fields in request body.
        ```
            {
                "status":"CANCELLED"
            }
        ```    
    


# 3. Payment service 

   I integrated Razorpay payment gateway with the following features:

   1. Order creation and management.
   2. Webhook implementation for real-time payment notifications.
   3. Payment signature verification for security.
   4. Error handling.

   For complete end-to-end testing, I would need a frontend checkout interface, but since this was a backend-focused project, I tested the order creation only.
   This service is production-ready and can handle payments once connected to a frontend checkout UI.


   
    ### All APIEndpoints of Payment Service:

    *Header is needed in all APIs* 
   **Authorizartion(Header)** :
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJzYWtzaGk1NkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IlNha3NoaSIsInJvbGUiOiJQQVRJRU5UIiwiaWF0IjoxNzYyOTMwMjQ1LCJleHAiOjE3NjMwMTY2NDV9.gZZN4DOXna-mT9NmCKFMOMHC6gA9OP7EGpASPnt7EtA


    1. POST url_of_auth_service/payment/


    Request Body

    ```
        {
            "doctorId": 1,
            "price":1200,
            "availabilityId" : 5
        }

    ```
    As soon as booking is confirmed, the attribute 'is_available' of slot table is changed to false. As, this slot is now booked by client.  
    

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


