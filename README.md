Installation
Terminal 1: Setting Up Backend

    Open a terminal and navigate to the backend directory:

    ```sh
cd backend
npm install
npm start
    ```
Create a file called .env in the backend folder and add your MongoDB URL and secret key:

.env

    MONGO_URL="Your MongoDB URL"
    SECRET_KEY="secret-key"

    Replace "Your Mongo URL" with your actual MongoDB connection string.

Terminal 2: Setting Up Frontend

    Open another terminal and navigate to the frontend directory:

    ```sh
cd frontend
npm install
npm start
   ```
Now, navigate to localhost:3000 in your browser.
The Backend API will be running at localhost:5178.