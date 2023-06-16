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
  };
};
function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
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
      assetDB.getBrandByID(response.results[0].BrandID, (response) => {
        if (user.Role !== response.results[0].label)
          return sendResponse(
            res,
            "This user has no permission",
            "invalid user"
          );
      });
    });
    req.user = user;
    //sendResponse(res, user, err);
    next();
  });
}

function authTokenAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    if (user.Role !== "Admin")
      return sendResponse(res, "Thsi user has no permission", "invalid user");
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

/* Response function  */
function sendResponse(res, message, error) {
  res.status(error !== undefined ? 400 : 200).json({
    message: message,
    error: error,
  });
}
