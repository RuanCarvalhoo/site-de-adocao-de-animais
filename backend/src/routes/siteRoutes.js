const { Router } = require("express");
const { asyncHandler } = require("../utils/asyncHandler");

function createSiteRoutes(siteController) {
  const router = Router();

  router.get("/", asyncHandler(siteController.get));

  return router;
}

module.exports = {
  createSiteRoutes
};
