# Todo App

This project is a simple Todo app. The application consists of two main screens: the Todos page, and the Authentication page. 

Deployed link: https://my-todos-tasks-app.netlify.app/

## Technologies Used

### Backend
- **Node.js** with Express for server-side logic
- **JWT (JSON Web Tokens)** for user authentication and authorization
- **MongoDB** for database storage

### Frontend
- **React** for building the user interface
- **Axios** for making HTTP requests to the backend


## Features

- User authentication (signup and login)
- Create, read, update, and delete Todo tasks
- Mark tasks as complete or incomplete
- Filter tasks by status (TODO, IN PROGRESS, COMPLETE) 
- Responsive design for various screen sizes

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Reactjs

### Installation

1. Clone the repository

2. Navigate to the project directory:

```bash
cd Todo
```

3. Install backend dependencies::

```bash
cd backend
npm install
```
4. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### Running the Application

1. Set up environment variables
 Create a `.env` file in the backend directory and add your MongoDB connection string and JWT secret:

2. Start the backend server
   
```bash
cd backend
node server.js
```
3. Start the frontend development server
   
```bash
cd frontend
npm run dev
```
 The application should now be running on `http://localhost:3000`.

## Usage

1. Sign up for a new account or log in with existing credentials
2. Add new tasks using the input field
3. Click on a task to mark it as complete
4. Edit or delete tasks using the respective buttons

## Folder Structure
   ```arduino
     Todo-app/
     │
     ├── backend/
     │   ├── config.js
     │   ├── middleware/ 
     │   ├── models/
     │   ├── routes/
     │   └── server.js
     │   └── package.json
     │
     ├── frontend/
     │   ├── public/
     │   ├── src/
     │   │   ├── components/
     │   │   ├── context.jsx
     │   │   ├── App.jsx
     │   │   ├── index.css 
     │   │   ├── main.jsx
     │   └── index.html
     │   └── package.json
     │
     └── README.md

   ```

  Contributions are welcome! Please fork the repository and create a pull request.
  
  #### Happy coding!
