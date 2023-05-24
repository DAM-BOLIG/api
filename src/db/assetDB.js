const { response } = require("express");

let Mysqlpool;

module.exports = (InjectedMysqlPool) => {
  Mysqlpool = InjectedMysqlPool;

  return {
    createAsset,
    getAsset,
  };
};

function createAsset(stylename, stylenumber, styleoptionnumber, cbFunc) {
  //const reqBody = req.body

  /*
    const stylename = reqBody.StyleName;
    const stylenumber = reqBody.StyleNumber;
    const styleoptionnumber = reqBody.StyleOptionNumber;
    const created = reqBody.Created;
    */

  const sql = `INSERT INTO asset (StyleName, StyleNumber, StyleOptionNumber)VALUES('${stylename}', '${stylenumber}', '${styleoptionnumber}')`;
  Mysqlpool.query(sql, cbFunc);
}

function getAsset(cbFunc) {
  const sql = "SELECT * FROM asset ORDER BY AssetID DESC";

  Mysqlpool.query(sql, cbFunc);
}

/*function getAsset(req, res, cbFunc) {
  const sql =
    ("SELECT * FROM asset ORDER BY AssetID DESC",
    function (err, result, fields) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  Mysqlpool.query(sql, cbFunc);
}*/

/*function getAsset(cbFunc) {
  const sql = "SELECT * FROM asset ORDER BY AssetID DESC";
  Mysqlpool.query(sql, response=>{
    cbFunc(false, response.results)
    return(results)
  });
}*/
