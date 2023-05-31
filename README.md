Steps to Install

Make sure you have docker installed on your machine.
Make sure you have no error while running `docker` and `docker-compose` in your terminal
Make sure you don't have any process on `3000` and `8000` port to avoid conflict port

Run the project

```
docker-compose up
```

Wait for the `client` and `server` install dependencies, then we will migrate database by:

```
docker-compose exec server yarn sequelize db:migrate --config src/databases/config.js
```

Then we're good to go:

Frontend App: http://localhost:8000
Backend App Swagger: http://localhost:3000/swagger

To run test:

```
docker-compose exec client yarn test
``
```
