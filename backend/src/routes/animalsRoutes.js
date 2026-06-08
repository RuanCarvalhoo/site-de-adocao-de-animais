const { Router } = require("express");
const { asyncHandler } = require("../utils/asyncHandler");

function createAnimalsRoutes(animalsController) {
  const router = Router();

  router.get("/", asyncHandler(animalsController.list));
  router.get("/:slug", asyncHandler(animalsController.getBySlug));

  return router;
}

module.exports = {
  createAnimalsRoutes
};
