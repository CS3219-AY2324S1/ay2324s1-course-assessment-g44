# How to run


### Instructions for User Service
1. Install dependencies by typing `npm install`
2. Open a new terminal process and type `cd src/backend/user_backend` and install dependencies by repeating step 1.
3. Navigate to `src/backend/user_backend` and start the postgres container using this command: \
`docker run -d --name postgresCont -p 5432:5432 -e POSTGRES_PASSWORD=<yourPassword> postgres`
4. Start the PGadmin web interface and handler with the command: \
`docker run -p 5050:80  -e "PGADMIN_DEFAULT_EMAIL=<your_email>" -e "PGADMIN_DEFAULT_PASSWORD=<your_password>"  -d dpage/pgadmin4`
5. Run `docker ps`, and inspect the postgres container using the id of that container i.e `docker inspect e9384754bc`
6. Copy and paste the IP address of the postgres container into the `.env` at the `PG_HOST=`as follows: 
  ```
  PG_USER=<user>
  PG_DATABASE=<database_name>
  PG_PASSWORD=<database_password>
  PG_HOST=<IP address of postgres container> (to be added after the postgres container is run)
  ```
  in an `.env` file inside `user_backend`.\
7. Run the following docker command to build the docker container:\ `docker build . -t user-service`\
8. Start the docker container for `user_backend` using `docker run -d -p 4200:4200 user_service`\
9.  Run the SQL query in PGadmin:
  - You can run an example sql query like 
  ```
  DROP TABLE IF EXISTS Users;

  CREATE TABLE Users(email_address VARCHAR(255) PRIMARY KEY, username VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL, id VARCHAR(255) UNIQUE NOT NULL, role VARCHAR(50) NOT NULL);

  INSERT INTO Users(email_address, username, password, id, role) VALUES ('admin123@gmail.com', 'admin', 'adminpassword', '1', 'admin');

  ```
  in your database.

10. Check that there are 3 containers running for the user service for postgres, PGadmin and user-service.
--- 
### Instructions for Question Service
1. Open a new terminal process, type `cd src/backend/question_backend` 
2. Build a container for question service using `docker build . -t question `.
3. Run the container using `docker run -d -p 3001:3001 question`. This is to run the question database on docker.
---
### Instructions for Frontend
#### In a separate terminal process, type `npm start` to run the frontend. Login with the credentials provided above.