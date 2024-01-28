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



## The database

* [SQLite](https://www.sqlite.org/index.html) – an in-process C-library implementing a lite, fast and  
serverless SQL database engine.
* Transactions are ACID (Atomic, Consistent, Isolated, Durable).
* Stored as ordinary disk files – portable between operating systems.


## Node.js SQLite libraries (packages)

* [node-sqlite3](https://www.npmjs.com/package/sqlite3) – asynchronous API, also has a synchronous mode.  
*800k downloads/week, 3466 dependent packages, > 13 years old*
* [sqlite](https://www.npmjs.com/package/sqlite) – a wrapper library to node-sqlite3, which adds  
ES6 promises (async/await). Fully asynchronous.  
*160k downloads/week, 402 dependents, 8 years old*
* [better-sqlite3](https://www.npmjs.com/package/better-sqlite3) – synchronous API, claims to be 2 – 10 times faster  
than the above. Transaction support, easy to use.  
*400k downloads/week, 1105 dependents, > 7 years old*