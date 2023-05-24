const { response } = require("express");

let assetDB;

module.exports = (InjectedAssetDB) => {
  assetDB = InjectedAssetDB;

  return {
    createAsset,
    getAsset,
  };
};

function createAsset(req, res) {
  assetDB.createAsset(
    req.body.StyleName,
    req.body.StyleNumber,
    req.body.StyleOptionNumber,
    (response) => {
      sendResponse(
        res,
        response.error === undefined ? "Succes!!" : "something, went wrong",
        response.error
      );
    }
  );
}

function getAsset(res) {
  assetDB.getAsset((response) => {
    sendResponse(
      res,
      response.error === undefined ? "Results" : "Error occured",
      response.error
    );
  });
}
function sendResponse(res, message, error) {
  res.status(error !== undefined ? 400 : 200).json({
    message: message,
    error: error,
  });
}
