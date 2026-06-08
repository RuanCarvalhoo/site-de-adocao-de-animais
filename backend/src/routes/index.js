const { Router } = require("express");
const { createAnimalRepository } = require("../repositories/animalRepository");
const { createAdoptionRepository } = require("../repositories/adoptionRepository");
const { createSiteRepository } = require("../repositories/siteRepository");
const { createAnimalsService } = require("../services/animalsService");
const { createAdoptionsService } = require("../services/adoptionsService");
const { createSiteService } = require("../services/siteService");
const { createAnimalsController } = require("../controllers/animalsController");
const { createAdoptionsController } = require("../controllers/adoptionsController");
const { createSiteController } = require("../controllers/siteController");
const { createAnimalsRoutes } = require("./animalsRoutes");
const { createAdoptionsRoutes } = require("./adoptionsRoutes");
const { createSiteRoutes } = require("./siteRoutes");

function createApiRouter(prisma) {
  const router = Router();

  const animalRepository = createAnimalRepository(prisma);
  const adoptionRepository = createAdoptionRepository(prisma);
  const siteRepository = createSiteRepository(prisma);

  const animalsService = createAnimalsService({ animalRepository });
  const adoptionsService = createAdoptionsService({
    adoptionRepository,
    animalRepository
  });
  const siteService = createSiteService({ siteRepository });

  const animalsController = createAnimalsController({ animalsService });
  const adoptionsController = createAdoptionsController({ adoptionsService });
  const siteController = createSiteController({ siteService });

  router.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  router.use("/site", createSiteRoutes(siteController));
  router.use("/animais", createAnimalsRoutes(animalsController));
  router.use("/adocoes", createAdoptionsRoutes(adoptionsController));

  return router;
}

module.exports = {
  createApiRouter
};
