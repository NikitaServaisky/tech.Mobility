# Tech Mobility API

Tech Mobility API is a backend system that provides functionalities for user registration, login, and profile management. It supports authentication via Facebook and includes SMS and email services for user verification.

## Features

- **User Registration**: Users can register by providing their details (email, password, first name, last name, phone, and city).
- **User Login**: Users can log in using their email and password.
- **Profile Management**: Users can view their profile information after logging in.
- **Facebook Authentication**: Users can log in using their Facebook account.
- **SMS Service**: Sends SMS messages for verification codes during registration.
- **Email Service**: Sends welcome emails upon successful registration.

## Technologies Used

- **Node.js**: Backend framework.
- **Express.js**: Web framework for building the API.
- **MongoDB**: Database for storing user data.
- **Passport.js**: Authentication middleware.
- **Twilio**: SMS service for verification codes.
- **Nodemailer**: Email service for sending registration emails.
- **JWT (JSON Web Token)**: Authentication mechanism for protected routes.
- **Bcrypt.js**: Library for hashing passwords.

## Setup

To set up the project locally, follow the steps below:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/NikitaServaisky/tech.Mobility.git
   cd tech.Mobility
