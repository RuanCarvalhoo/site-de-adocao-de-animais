const { Router } = require("express");
const { mapAnimal } = require("./helpers");

function createAnimalsRouter(prisma) {
  const router = Router();

  router.get("/", async (req, res) => {
    try {
      const animals = await prisma.animal.findMany({
        orderBy: { nome: "asc" }
      });

      return res.json(animals.map(mapAnimal));
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  });

  router.get("/:slug", async (req, res) => {
    try {
      const animal = await prisma.animal.findUnique({
        where: { slug: req.params.slug }
      });

      if (!animal) {
        return res.status(404).json({ message: "Animal nao encontrado." });
      }

      return res.json(mapAnimal(animal));
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  });

  return router;
}

module.exports = {
  createAnimalsRouter
};
