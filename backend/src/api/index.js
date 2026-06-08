const { Router } = require("express");
const { createAnimalsRouter } = require("./animals");
const { createAdoptionsRouter } = require("./adoptions");
const { createSiteRouter } = require("./site");

function createApiRouter(prisma) {
  const router = Router();

  router.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  router.use("/site", createSiteRouter(prisma));
  router.use("/animais", createAnimalsRouter(prisma));
  router.use("/adocoes", createAdoptionsRouter(prisma));

  return router;
}

module.exports = {
  createApiRouter
};
