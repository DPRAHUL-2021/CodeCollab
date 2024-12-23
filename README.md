# CodeCollab

CodeCollab is a collaborative platform that allows users to manage repositories and issues efficiently. This project is built using a modern tech stack including React, TypeScript, Tailwind CSS, and Material-UI for the frontend, and Node.js, Express, and MongoDB for the backend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- User authentication and authorization
- Repository management (create, delete, list)
- Issue management (create, mark as done, list)
- Responsive and modern UI with dark theme support

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Material-UI
- Axios
- Vite

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT for authentication

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/codecollab.git
   cd codecollab/backend

2. Install dependencies:
   
   ```bash
   npm install

3. Create a .env file in the backend directory and add the following environment variables:
   
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

4. Start the backend server:
   
   ```bash
   npm run dev


### Frontend Setup

1. Navigate to the frontend directory:
   
   ```bash
   cd ../frontend/project

2. Install dependencies:
   
   ```bash
   npm install

3. Start the frontend development server:
   
   ```bash
   npm run dev


### Usage

- Open your browser and navigate to http://localhost:3000 for the frontend.
- Use the backend API at http://localhost:5000 for managing repositories and issues.


## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch
   (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes
   (git commit -m 'Add some feature').
5. Push to the branch
   (git push origin feature-branch).
6. Open a pull request.
