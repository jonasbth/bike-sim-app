## The backend API

The API exposes the functionality of an imaginary bike rental application.

The endpoints are documented at [public/index.html](backend/public/index.html).

Features of the implementation:

* Built using [Express](https://expressjs.com/).
* The routes (endpoints) are defined in [routes/api.js](backend/routes/api.js).
* The database queries are defined in [models/db_model.js](backend/models/db_model.js).
* Express.static middleware serving API documentation,  
 and a map application for  the simulation.
* Graceful shutdown of server and database connection.