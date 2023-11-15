# CS3219 AY2324S1 Project Team G44

### Setup

First, start by ensuring that you have NodeJS installed. The following command should show the version of NodeJS you have installed on your local machine.
```
node --version
```

Next, ensure that you have docker installed on your local machine by running the following command. It should show the version of docker that you have installed on your local machine.
```
docker --version
```
Then, clone the app on your desired directory on your local machine, using the following command.
`git clone https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g44.git`

### Instructions to run app locally

Start the Docker Daemon on your local machine by running the Docker application.

Next, we need to configure some environment variables first. There are few environment variables that needs to be configured in `src/docker-compose.yml`, before running the app. They are listed below in the follow format: variableName in serviceName
* `POSTGRES_PASSWORD` in `postgres_db`
* `PG_PASSWORD` in `user-backend`
* `mongoString` in `question-backend`
* `AMPQURL` in `matching-backend`
* `KEY` in `code-execution`

The values for the last 3 environment variables can be found in Assignment5-environmentVariables.txt that was uploaded to Canvas. However, for `POSTGRES_PASSWORD` and `PG_PASSWORD`, please input your own password to your own Postgres(i.e. the values for both `POSTGRES_PASSWORD` and `PG_PASSWORD` is the same, which is your own password to postgres). The default password should be `postgres`.

Next, run the following command to ensure that the docker images are built, in order to run the app.
```
docker-compose -f src/docker-compose.yml build
```
Then, to start the containers, run the following command.
```
docker-compose -f src/docker-compose.yml up -d
```

On two different browsers, you can now use the app by connecting to http://localhost:8080 and http://localhost:8081 respectively.
<img width="1437" alt="image" src="https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g44/assets/61372278/af189d4d-89d4-4d1e-9ff3-ccb8331f1f69">

<img width="1438" alt="image" src="https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g44/assets/61372278/98f64c2d-558c-4bd4-b680-fba32bca5ab7">

### Instructions to stop the containers

Run the following command to stop all containers and remove them.
```
docker-compose -f src/docker-compose.yml down
```
