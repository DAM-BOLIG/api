//Get Asset
//Get All Asset by ID
const { response } = require("express");
const env = require("dotenv").config();
const jtw = require("jsonwebtoken");
let assetDB;

module.exports = (InjectedAssetDB) => {
  assetDB = InjectedAssetDB;

  return {};
};
