const Mysqlpool = require("./db/dbConnection.js");
const assetdb = require("./db/assetDB.js")(Mysqlpool);
const express = require("express");
const app = express();
const damservice = require("./service/damservice.js")(assetdb);
const auth = require("./auth/auth.js")(assetdb);

const routes = require("./api/routes.js")(express.Router(), damservice, auth);

//app.use(damservice);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
