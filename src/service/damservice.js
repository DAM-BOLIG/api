const { response } = require("express");

let assetDB;

module.exports = (InjectedAssetDB) => {
  assetDB = InjectedAssetDB;

  return {
    /* Asset requests  */
    createAsset,
    getAsset,
    deleteAsset,
    putAsset,
    /* Category requests  */
    getCategory,
    createCategory,
    deleteCategory,
    putCategory,
  };
};

/* Asset requests  */

function createAsset(req, res) {
  assetDB.createAsset(
    req.body.StyleName,
    req.body.StyleNumber,
    req.body.StyleOptionNumber,
    (response) => {
      sendResponse(
        res,
        response.error === null ? "Succes!!" : "something, went wrong"
        //response.error
      );
    }
  );
}

function getAsset(req, res) {
  assetDB.getAsset((response) => {
    sendResponse(
      res,
      response.results.length === null ? "No Results" : response.results
      //response.error
    );
  });
}

function deleteAsset(req, res) {
  assetDB.deleteAsset(req.params.StyleNumber, (response) => {
    sendResponse(
      res,
      response.error === null ? "Record Deleted" : "Something Went Wrong",
      response.error
    );
  });
}

function putAsset(req, res) {
  assetDB.putAsset(req.body.StyleName, req.params.StyleNumber, (response) => {
    sendResponse(
      res,
      response.error === null ? "Record Updated" : "Something Went Wrong"
      //response.error
    );
  });
}

/* Category requests  */

function createCategory(req, res) {
  assetDB.createCategory(req.body.Name, (response) => {
    sendResponse(
      res,
      response.error === null ? "Succes!!" : "something, went wrong"
      //response.error
    );
  });
}

function getCategory(req, res) {
  assetDB.getCategory((response) => {
    sendResponse(
      res,
      response.results.length === null ? "No Results" : response.results
      //response.error
    );
  });
}

function deleteCategory(req, res) {
  assetDB.deleteCategory(req.params.CategoryID, (response) => {
    sendResponse(
      res,
      response.error === null ? "Record Deleted" : "Something Went Wrong"
      //response.error
    );
  });
}

function putCategory(req, res) {
  assetDB.putCategory(req.body.Name, req.params.CategoryID, (response) => {
    sendResponse(
      res,
      response.error === null ? "Record Updated" : "Something Went Wrong"
      //response.error
    );
  });
}

/* Response function  */
function sendResponse(res, message, error) {
  res.status(error !== undefined ? 400 : 200).json({
    message: message,
    error: error,
  });
}
