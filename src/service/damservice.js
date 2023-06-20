const { response } = require("express");
const env = require("dotenv").config();
const jtw = require("jsonwebtoken");
let assetDB;

module.exports = (InjectedAssetDB) => {
  assetDB = InjectedAssetDB;

  return {
    /* Asset requests  */
    createAsset,
    assetInfo,
    getAsset,
    getAssetByID,
    deleteAsset,
    putAsset,
    getCategory,
    createCategory,
    deleteCategory,
    putCategory,
    getBrand,
    getColor,
    authToken,
    //createUser,
  };
};

/* Asset requests  */

function createAsset(req, res) {
  assetDB.createAsset(
    req.body.StyleName,
    req.body.Width,
    req.body.Height,
    req.body.Length,
    req.body.Description,
    /*req.body.Created,*/
    req.body.CategoryID,
    req.body.BrandID,
    req.body.ColorID,
    req.body.Primary_IMG,
    (response) => {
      sendResponse(
        res,
        response.error === null ? "Succes!!" : "something, went wrong",
        response.error
      );
    }
  );
}

function assetInfo(req, res) {
  assetDB.assetInfo((response) => {
    sendResponse(
      res,
      response.results.length === null ? "No Results" : response.results,
      response.error
    );
  });
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

function getAssetByID(req, res) {
  assetDB.getAssetByID(req.params.AssetID, (response) => {
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
  assetDB.putAsset(req.body.StyleName, req.params.AssetID, (response) => {
    sendResponse(
      res,
      response.error === null ? "Record Updated" : "Something Went Wrong",
      response.error
    );
  });
}

/* Category requests  */

function createCategory(req, res) {
  assetDB.createCategory(req.body.label, (response) => {
    sendResponse(
      res,
      response.error === null ? "Succes!!" : "something, went wrong",
      response.error
    );
  });
}

function getCategory(req, res) {
  assetDB.getCategory((response) => {
    sendResponse(
      res,
      response.results.length === null ? "No Results" : response.results,
      response.error
    );
  });
}

function deleteCategory(req, res) {
  assetDB.deleteCategory(req.params.CategoryID, (response) => {
    sendResponse(
      res,
      response.error === null ? "Record Deleted" : "Something Went Wrong",
      response.error
    );
  });
}

function putCategory(req, res) {
  assetDB.putCategory(req.body.label, req.params.CategoryID, (response) => {
    sendResponse(
      res,
      response.error === null ? "Record Updated" : "Something Went Wrong",
      response.error
    );
  });
}

/* Brand requests  */

function getBrand(req, res) {
  assetDB.getBrand((response) => {
    sendResponse(
      res,
      response.results.length === null ? "No Results" : response.results,
      response.error
    );
  });
}

/* Color requests  */

function getColor(req, res) {
  assetDB.getColor((response) => {
    sendResponse(
      res,
      response.results.length === 0 ? "No Results" : response.results,
      response.error
    );
  });
}

function authToken(req, res) {
  assetDB.authToken((response) => {
    sendResponse(
      res,
      response.results.length === null ? "No Results" : response.results,
      response.error
    );
  });
}

/* Response function  */
function sendResponse(res, message, error) {
  res.status(error !== null ? 400 : 200).json({
    message: message,
    error: error,
  });
}
