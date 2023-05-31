const { response } = require("express");

let Mysqlpool;

module.exports = (InjectedMysqlPool) => {
  Mysqlpool = InjectedMysqlPool;

  return {
    createAsset,
    getAsset,
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
  StyleNumber,
  CategoryID,
  BrandID,
  ColorID,
  Primary_IMG,
  Secondary_IMG,
  Optional_IMG,
  cbFunc
) {
  const sql = `Insert INTO asset (StyleName, StyleNumber, CategoryID, BrandID, ColorID, Primary_IMG, Secondary_IMG, Optional_IMG)VALUES('${StyleName}', '${StyleNumber}', '${CategoryID}', '${BrandID}', '${ColorID}', '${Primary_IMG}', '${Secondary_IMG}', '${Optional_IMG}')`;
  Mysqlpool.query(sql, cbFunc);
}

function getAsset(cbFunc) {
  const sql = "SELECT * FROM asset ORDER BY AssetID DESC";

  Mysqlpool.query(sql, cbFunc);
}

function deleteAsset(StyleNumber, cbFunc) {
  const sql = "DELETE FROM asset WHERE StyleNumber = " + StyleNumber + "";

  Mysqlpool.query(sql, cbFunc);
}

function putAsset(stylename, stylenumber, cbFunc) {
  const sql = `UPDATE asset SET StyleName = '${stylename}' WHERE StyleNumber = '${stylenumber}'`;
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

function putCategory(CategoryName, CategoryID, cbFunc) {
  const sql = `UPDATE category SET Name = '${CategoryName}' WHERE CategoryID = '${CategoryID}'`;
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
