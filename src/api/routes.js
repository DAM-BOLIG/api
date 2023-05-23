//const { Router, response } = require('express');
module.exports = (router, damservice) => {
    router.post('/newasset', damservice.createAsset)
        /*var body = req.body;
        res.send(body);*/
    router.get('/asset', damservice.getAsset)
    return(router);
}