# Acowale News

## Overview

Acowale News is a news application that provides users with the latest news articles based on their search parameters or top headlines. It consists of a backend server built with Express.js and a frontend client built with React.js.

## Project Structure


## Backend

The backend server handles API requests and fetches news articles from the GNews API.

### Setup

1. **Navigate to the backend folder:**

   ```bash
   cd backend
2. **nstall dependencies**
    ```bash
   npm install

4. **Create a .env file in the backend directory with the following content:**
    ```bash
    API_KEY=<GNews API-key>
    FRONTEND_URL=<frontend connection URL>

6. **Start the server:**
    ```bash
     npm start

### API Endpoints
  **POST /search**
  
  Description: Fetches news articles based on search parameters.
  Request Body: {
                  "parameter": "search_term",
                  "language": "en",
                  "country": "us"
                }

    Response:  {
                  "articles": [ ... ],
                  "totalArticles": 100
                }

  
  **POST /search**
  
  Description: Fetches top headlines based on a category.
  Request Body: {
                  "parameter": "category",
                  "language": "en",
                  "country": "us"
                }

    Response:  {
                  "articles": [ ... ],
                  "totalArticles": 100
                }

## Frontend

### Setup
1. **Navigate to the Frontend folder:**

   ```bash
   cd frontend
2. **nstall dependencies**
   ```bash
    npm install

3. **Create a .env file in the frontend directory with the following content:**
   ```bash
     REACT_APP_BACKEND_URL=<your backend connection URL>

4. **Start the server:**
    ```bash
    npm start

