//const { Router, response } = require('express');
const path = require("path");
module.exports = (router, damservice, auth) => {
  /* Asset requests  */
  router.get("/asset_info", auth.autThokenGetReq, damservice.assetInfo);
  router.post("/newasset", auth.authToken, damservice.createAsset);
  router.get("/allasset", auth.autThokenGetReq, damservice.getAsset);
  router.delete(
    "/deleteasset/:AssetID",
    auth.authTokenAssetID,
    damservice.deleteAsset
  );
  router.put(
    "/updateasset/:AssetID",
    auth.authTokenAssetID,
    damservice.putAsset
  );
  router.get("/asset/:AssetID", auth.autThokenGetReq, damservice.getAssetByID);
  /* Category requests  */
  router.post("/newcategory", auth.authTokenNoGateway, damservice.createCategory);
  router.get("/allcategory", auth.autThokenGetReq, damservice.getCategory);
  router.delete("/deletecategory/:CategoryID", auth.authTokenNoGateway, damservice.deleteCategory);
  router.put("/updatecategory/:CategoryID", auth.authTokenNoGateway, damservice.putCategory);
  /*  Brand requests: GET   */
  router.get("/allbrand", auth.autThokenGetReq, damservice.getBrand);
  /*  Color requests: GET  */
  router.get("/allcolor", auth.authTokenNoGateway,damservice.getColor);
  /* User requests: POST */
  //router.post("/newuser", damservice.createUser);
  //router.post("/authtoken", auth.authToken);
  return router;
};
