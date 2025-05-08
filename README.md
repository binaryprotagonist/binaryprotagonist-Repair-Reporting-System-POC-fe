# Property Contact Form - React (Frontend)

## Overview

A React-based application that allows prospective tenants to inquire about properties by filling out a contact form. The form captures the following information:

- Name
- Email
- Contact Number (with country code)
- Message
  When the form is submitted, it triggers an API request to the backend to send the inquiry details to the property owner via email.

## Features

- Form validation (email, contact number, and required fields).
- User-friendly messages indicating the success or failure of the submission.
- Integration with the backend server to handle email sending.

---

## Prerequisites

Before you start, ensure that you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

---

## Installation

### 1. Clone the repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/yourusername/property-contact-form-react.git
cd property-contact-form-react
```

### 2. Install dependencies

Install all the required dependencies:

```bash
npm install
```

### 3. Configure the `.env` file

Create a `.env` file in the root of your React project and add the following:

```
REACT_APP_API_URL=http://localhost:3000
```

## Make sure to replace `http://localhost:3000` with your actual backend server URL if deployed in production.

## Running the Project

### 1. Start the React Application

Once everything is set up, you can run the React app locally by running:

```bash
npm start
```

## This will start the React app on `http://localhost:3000` by default.

## Conclusion

This project is a simple contact form that allows prospective tenants to inquire about a property. It features form validation, a user-friendly interface, and integrates with a backend server for sending email notifications.
