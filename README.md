# How to run

1. Install dependencies by typing `npm install`
2. Open a new terminal process and type `cd src/backend` and install dependencies by repeating step 1
3. In the same terminal process, type `cd user_backend` and run `node index.js`. This is to run the user database
  - Our database postgresql is run locally, so you would have to include 
  ```
  PG_USER=<user>
  PG_DATABASE=<database_name>
  PG_PASSWORD=<database_password>
  ```
  in a `.env` file outside of `src`
4. Open a new terminal process, type `cd src/backend/question_backend` and run `node index.js`. This is to run the question database.
5. In a separate terminal process, type `npm start` to run the frontend.
