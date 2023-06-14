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
  const sql = `Insert INTO asset (StyleName, Width, Height, Length, Description, Created, CategoryID, BrandID, ColorID, Primary_IMG)VALUES('${StyleName}','${Width}','${Height}', '${Length}', '${Description}', CURRENT_DATE, '${CategoryID}', '${BrandID}', '${ColorID}', '${Primary_IMG}')`;
  Mysqlpool.query(sql, cbFunc);
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
  const sql = "CALL asset_by_id(" + AssetID + ")";

  Mysqlpool.query(sql, cbFunc);
}

function deleteAsset(AssetID, cbFunc) {
  const sql = "DELETE FROM asset WHERE AssetID = " + AssetID + "";

  Mysqlpool.query(sql, cbFunc);
}

function putAsset(stylename, AssetID, cbFunc) {
  const sql = `UPDATE asset SET StyleName = '${stylename}' WHERE AssetID = '${AssetID}'`;
  Mysqlpool.query(sql, cbFunc);
}

/* Category requests  */

function getCategory(cbFunc) {
  const sql = "SELECT * FROM category ORDER BY CategoryID DESC";

  Mysqlpool.query(sql, cbFunc);
}

function createCategory(Name, cbFunc) {
  const sql = `Insert INTO category (Name)VALUES('${Name}')`;
  Mysqlpool.query(sql, cbFunc);
}

function deleteCategory(CategoryID, cbFunc) {
  const sql = "DELETE FROM category WHERE CategoryID = " + CategoryID + "";

  Mysqlpool.query(sql, cbFunc);
}

function putCategory(label, CategoryID, cbFunc) {
  const sql = `UPDATE category SET label = '${label}' WHERE CategoryID = '${CategoryID}'`;
  Mysqlpool.query(sql, cbFunc);
}

/* Brand requests  */
function getBrand(cbFunc) {
  const sql = "SELECT * FROM brand ORDER BY BrandID DESC";

  Mysqlpool.query(sql, cbFunc);
}

/* Color requests  */

function getColor(cbFunc) {
  const sql = "SELECT * FROM color ORDER BY ColorID DESC";

  Mysqlpool.query(sql, cbFunc);
}
