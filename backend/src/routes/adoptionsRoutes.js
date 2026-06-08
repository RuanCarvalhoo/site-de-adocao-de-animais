const { Router } = require("express");
const { asyncHandler } = require("../utils/asyncHandler");

function createAdoptionsRoutes(adoptionsController) {
  const router = Router();

  router.get("/", asyncHandler(adoptionsController.list));
  router.post("/", asyncHandler(adoptionsController.create));

  return router;
}

module.exports = {
  createAdoptionsRoutes
};
