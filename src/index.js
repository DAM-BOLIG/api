const Mysqlpool = require('./db/dbConnection.js');
const assetdb = require('./db/assetDB.js')(Mysqlpool);
const express = require('express');
const app = express();
const damservice = require('./service/damservice.js')(assetdb);

const routes = require('./api/routes.js')(
   express.Router(),
   damservice
)

//app.use(damservice);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

const port = 3000;
app.listen(port, ()=> {
   console.log(`Listening on port ${port}`);
});

/*const express = require("express");
const APIRouter = require('./api/routes.js');

const app = express();
//const PORT = 3001;

app.use(express.json());
//app.use(express.urlencoded());

app.use((req, res, next) => {
   console.log(`${req.method}:${req.url}`);
   next();
});

//app.use(APIRouter);

//app.listen(PORT, () => console.log(`Running Express Server on ${PORT}!`));*/

