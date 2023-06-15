//const { Router, response } = require('express');
const path = require("path");
module.exports = (router, damservice, auth) => {
  /* Asset requests  */
  router.get("/asset_info", damservice.assetInfo);
  router.post("/newasset", auth.authToken, damservice.createAsset);
  router.get("/allasset", damservice.getAsset);
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
  router.get("/asset/:AssetID", damservice.getAssetByID);
  /* Category requests  */
  router.post("/newcategory", damservice.createCategory);
  router.get("/allcategory", damservice.getCategory);
  router.delete("/deletecategory/:CategoryID", damservice.deleteCategory);
  router.put("/updatecategory/:CategoryID", damservice.putCategory);
  /*  Brand requests: GET   */
  router.get("/allbrand", damservice.getBrand);
  /*  Color requests: GET  */
  router.get("/allcolor", damservice.getColor);
  /* User requests: POST */
  //router.post("/newuser", damservice.createUser);
  router.post("/authtoken", auth.authToken);
  return router;
};
