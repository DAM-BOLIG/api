let assetDB;
const env = require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (InjectedAssetDB) => {
  assetDB = InjectedAssetDB;

  return {
    authToken,
    authTokenAssetID,
    authTokenAdmin,
    autThokenGetReq,
    authTokenNoGateway,
  };
};
function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    if (user.Role === "Admin")
    assetDB.getBrandByID(req.body.BrandID, (response) => {
        if (user.Role !== response.results[0].label)
          return sendResponse(res, "This user has no permission", "invalid user");
    });
    req.user = user;
    //sendResponse(res, user, err);
    next();
  });
}

function authTokenAssetID(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    assetDB.getBrandIDbyAssetID(req.params.AssetID, (response) => {
      if (response.results[0].BrandID === undefined) return(sendResponse(res, "Asset not found", "invalid user"));
      assetDB.getBrandByID(response.results[0].BrandID, (response) => {
        if (user.Role !== response.results[0].label)
          return sendResponse(
            res,
            "This user has no permission",
            "invalid user"
          );
          next();
      });
    });
    req.user = user;
    //sendResponse(res, user, err);
    //next();
  });
}

function authTokenAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    if (user.Role !== "Admin")
      return sendResponse(res, "This user has no permission", "invalid user");
    req.user = user;
    //sendResponse(res, user, err);
    next();
  });
}

function autThokenGetReq(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    //sendResponse(res, user, err);
    next();
  });
}

function authTokenNoGateway(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    if (user.Role === "Gateway")
      return sendResponse(res, "This user has no permission", "invalid user");
    req.user = user;
    //sendResponse(res, user, err);
    next();
  });
}


/* Response function  */
function sendResponse(res, message, error) {
  res.status(error !== undefined ? 400 : 200).json({
    message: message,
    error: error,
  });
}
