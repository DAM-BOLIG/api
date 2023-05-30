//const { Router, response } = require('express');
module.exports = (router, damservice) => {
  /* Asset requests  */
  router.post("/newasset", damservice.createAsset);
  router.get("/allasset", damservice.getAsset);
  router.delete("/deleteasset/:StyleNumber", damservice.deleteAsset);
  router.put("/updateasset/:StyleNumber", damservice.putAsset);
  /* Category requests  */
  router.post("/newcategory", damservice.createCategory);
  router.get("/allcategory", damservice.getCategory);
  router.delete("/deletecategory/:CategoryID", damservice.deleteCategory);
  router.put("/updatecategory/:CategoryID", damservice.putCategory);
  return router;
};
