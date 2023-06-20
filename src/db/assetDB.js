const { response } = require("express");

let Mysqlpool;

module.exports = (InjectedMysqlPool) => {
  Mysqlpool = InjectedMysqlPool;

  return {
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
    getBrandByID,
    getBrandIDbyAssetID,
    getColor,
  };
};

/* Asset requests  */

function createAsset(
  StyleName,
  Width,
  Height,
  Length,
  Description,
  CategoryID,
  BrandID,
  ColorID,
  Primary_IMG,
  cbFunc
) {
  const values = [
    StyleName,
    Width,
    Height,
    Length,
    Description,
    //Created,
    CategoryID,
    BrandID,
    ColorID,
    Primary_IMG,
  ];
  const sql =
    "INSERT INTO asset (StyleName, Width, Height, Length, Description, Created, CategoryID, BrandID, ColorID, Primary_IMG) VALUES (?,?,?,?,?,CURRENT_DATE,?,?,?,?)";
  Mysqlpool.execute(sql, values, cbFunc);
}

function assetInfo(cbFunc) {
  const sql = "CALL asset_info";

  Mysqlpool.query(sql, cbFunc);
}

function getAsset(cbFunc) {
  const sql = "SELECT * FROM asset ORDER BY AssetID DESC";

  Mysqlpool.query(sql, cbFunc);
}

function getAssetByID(AssetID, cbFunc) {
  //const sql = "CALL asset_by_id(" + AssetID + ")";
  const sql = "CALL asset_by_id(?)";
  const values = [AssetID];

  Mysqlpool.execute(sql, values, cbFunc);
}

function deleteAsset(AssetID, cbFunc) {
  const values = [AssetID];
  const sql = "DELETE FROM asset WHERE AssetID = ?";

  Mysqlpool.execute(sql, values, cbFunc);
}

function putAsset(stylename, AssetID, cbFunc) {
  const sql = "UPDATE asset SET StyleName = ? WHERE AssetID = ?";
  const values = [stylename, AssetID];
  Mysqlpool.execute(sql, values, cbFunc);
}

/* Category requests  */

function getCategory(cbFunc) {
  const sql = "SELECT * FROM category ORDER BY CategoryID DESC";

  Mysqlpool.query(sql, cbFunc);
}

function createCategory(label, cbFunc) {
  const sql = "INSERT INTO category (label) VALUES (?)";
  const values = [label];
  Mysqlpool.execute(sql, values, cbFunc);
}

function deleteCategory(CategoryID, cbFunc) {
  const sql = "DELETE FROM category WHERE CategoryID = ?";
  const values = [CategoryID];

  Mysqlpool.execute(sql, values, cbFunc);
}

function putCategory(label, CategoryID, cbFunc) {
  const sql = "UPDATE category SET label = ? WHERE CategoryID = ?";
  values = [label, CategoryID];
  Mysqlpool.execute(sql, values, cbFunc);
}

/* Brand requests  */
function getBrand(cbFunc) {
  const sql = "SELECT * FROM brand ORDER BY BrandID DESC";

  Mysqlpool.query(sql, cbFunc);
}

function getBrandByID(BrandID, cbFunc) {
  const sql = "SELECT label FROM brand WHERE BrandID = ?";
  const values = [BrandID];

  Mysqlpool.execute(sql, values, cbFunc);
}

function getBrandIDbyAssetID(AssetID, cbFunc) {
  const sql = "SELECT BrandID FROM asset WHERE AssetID = ?";
  const values = [AssetID];

  Mysqlpool.execute(sql, values, cbFunc);
}

/* Color requests  */

function getColor(cbFunc) {
  const sql = "SELECT * FROM color ORDER BY ColorID DESC";

  Mysqlpool.query(sql, cbFunc);
}
