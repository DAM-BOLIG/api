const {response} = require('express');

let Mysqlpool;

module.exports = (InjectedMysqlPool) => {
    Mysqlpool = InjectedMysqlPool;
    
    return {
        createAsset,
        getAsset
    };
};


function createAsset(stylename, stylenumber,styleoptionnumber, cbFunc){
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

function getAsset(){
    const sql = 'SELECT * FROM asset';

    Mysqlpool.query()
}