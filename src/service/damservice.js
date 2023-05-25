const { response } = require("express");

let assetDB;

module.exports = (InjectedAssetDB) => {
  assetDB = InjectedAssetDB;

  return {
    createAsset,
    getAsset,
    deleteAsset,
    putAsset,
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
        response.error === null ? "Succes!!" : "something, went wrong",
        response.error
      );
    }
  );
}

function getAsset(req, res) {
  assetDB.getAsset((response) => {
    sendResponse(
      res,
      response.results.length === null ? "No Results" : response.results,
      response.error
    );
  });
}

function deleteAsset(req, res) {
  assetDB.deleteAsset(req.params.AssetID, (response) => {
    sendResponse(
      res,
      response.error === null ? "Record Deleted" : "Something Went Wrong",
      response.error
    );
  });
}

function putAsset(req, res) {
  assetDB.putAsset(req.params.AssetID, (response) => {
    sendResponse(
      res,
      response.error === null ? "Record Updated" : "Something Went Wrong",
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
