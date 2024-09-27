

# Backend Assignment


## Welcome to My Project

I’m excited to share this API that retrieves the latest YouTube videos based on specific tags or search queries. The API is designed to deliver results in reverse chronological order, complete with pagination and robust search functionality for titles and descriptions. I look forward to the opportunity to discuss how my expertise can add value to your team!

## Important Links

For the frontend of this project, please visit the GitHub repository: [YouTube Assignment Frontend](https://github.com/VanshWadhwa/youtube-assignment-frontend).

You can also check the API documentation here: [Postman Documentation](https://documenter.getpostman.com/view/38631609/2sAXqy3Kbj).

For a visual overview, watch the video here: [Project Overview Video](https://youtu.be/xEcN8J2foOg).

## Tech Stack Used

- **Node.js**: Chosen for its asynchronous nature, making it suitable for handling concurrent API requests efficiently.
- **Express.js**: A minimal web framework for Node.js, used for building the RESTful API.
- **PostgreSQL**: A powerful, open-source relational database for storing video data with proper indexing.
- **Sequelize**: A promise-based Node.js ORM for PostgreSQL, facilitating easier database interactions.
- **Docker**: Used for containerization, ensuring the application runs consistently across different environments.
- **Node-cron**: A cron-like job scheduler for Node.js to fetch videos at regular intervals.
- **Axios**: For making HTTP requests to the YouTube API.
- **ESLint**: A tool for identifying and fixing problems in JavaScript code, ensuring code quality.
- **Prettier**: A code formatter that enforces consistent style across the codebase.
- **Husky**: Git hooks to enforce quality checks before commits.
- **Commitlint**: Ensures that commit messages adhere to a specified convention.
- **JSDoc**: Documentation generator for JavaScript, facilitating better code understanding and maintenance.

## Features Implemented

- ✅ **Continuous API Calls**: Fetches latest videos every 10 seconds.
- ✅ **Data Storage**: Stores video data in a well-indexed database.
- ✅ **Paginated Response**: GET API returns videos sorted by publishing datetime.
- ✅ **Search Functionality**: Search by title and description.
- ✅ **Dockerized**: Consistent deployment across environments.
- ✅ **Scalable Code**: Modular design, asynchronous processing, efficient database indexing.

### Bonus Points

- ✅ **Multiple API Key Support**: Auto-switches on quota exhaustion.
- ✅ **Dashboard**: Optional viewing interface not implemented.
- ✅ **Optimized Search**: Supports partial matches in titles/descriptions.


## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VanshWadhwa/youtube-assignment-backend
   cd youtube-assignment-backend
   ```

## Setting Up the Environment

1. **Create a `.env` file** from the `example.env` file and set your database credentials and YouTube API keys:

   ```env
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=db
   API_KEYS=your_api_key_1,your_api_key_2
   NODE_ENV=dev

3. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Project

1. **Start the Docker containers**:
   ```bash
   docker-compose up --build
   ```

2. **Access the API**:
   - The API will be running at `http://localhost:3000`.
   - Endpoints:
     - `POST /cron/start`: Start the cron job to fetch videos.
     - `POST /cron/stop`: Stop the cron job.
     - `GET /video`: Fetch stored videos (paginated).
     - `GET /video/search`: Search videos by title or description.



## Building Documentation

To generate the documentation using JSDoc, run the following command:
```bash
npx jsdoc -c jsdoc.json
```
This will create a `docs` folder with the generated documentation.
