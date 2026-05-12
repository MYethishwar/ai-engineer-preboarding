# Travel Journal Application

## Project Overview

The Travel Journal Application is a full-stack web application developed to help users document, organize, and manage their travel experiences digitally. The application allows users to create travel journals, upload trip photos, track expenses, maintain wishlists for future destinations, and store important travel memories in a structured manner.

The project is developed using a modern technology stack consisting of React.js for the frontend, FastAPI for the backend, and MongoDB as the database. The application follows a REST API architecture and supports CRUD operations for managing travel data efficiently.

## Features

- Create and manage travel journal entries
- Store trip details such as location, dates, and descriptions
- Track travel expenses and calculate total expenditure
- Upload and manage travel photos
- Add favorite moments and visited places
- Maintain a wishlist for future travel destinations
- Search journals by location or title
- Responsive frontend user interface
- Backend API integration with MongoDB

## Frontend

The frontend is built using React.js and Tailwind CSS. It provides an interactive and responsive user interface for users to interact with the application. React Router is used for navigation between pages, while Axios or Fetch API is used to communicate with backend APIs.

## Backend

The backend is developed using FastAPI, which provides high-performance asynchronous API handling. The backend manages journal entries, wishlist data, image uploads, and database communication.

## Database

MongoDB is used as the primary database for storing:
- Journal entries
- Expense details
- Wishlist items
- Uploaded image references

Motor AsyncIO driver is used for asynchronous communication between FastAPI and MongoDB.

## Image Upload System

The application supports image uploads using FastAPI file handling features. Uploaded images are stored in a local uploads directory and served as static files.

## Docker Support

The project is containerized using Docker. A multi-stage Dockerfile is used to:
1. Build the React frontend
2. Install Python backend dependencies
3. Combine frontend and backend into a single container

## Deployment

The application can be deployed using:
- Docker Hub
- Google Cloud Run
- Firebase Hosting (frontend)
- Local Docker containers

## Conclusion

The Travel Journal Application demonstrates the implementation of a modern full-stack architecture using React, FastAPI, MongoDB, and Docker. The project provides practical experience in frontend development, backend API creation, database management, file handling, and cloud deployment.