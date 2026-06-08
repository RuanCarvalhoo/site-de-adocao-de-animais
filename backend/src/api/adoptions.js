const { Router } = require("express");

function createAdoptionsRouter(prisma) {
  const router = Router();

  router.get("/", async (req, res) => {
    try {
      const requests = await prisma.adoptionRequest.findMany({
        include: { animal: true },
        orderBy: { createdAt: "desc" }
      });

      const formatted = requests.map((request) => ({
        id: request.id,
        animal: {
          id: request.animal.id,
          nome: request.animal.nome,
          slug: request.animal.slug,
          status: request.animal.status
        },
        observacao: request.observacao,
        createdAt: request.createdAt
      }));

      return res.json(formatted);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { animalSlug, observacao } = req.body;

      if (!animalSlug) {
        return res.status(400).json({ message: "Informe o slug do animal." });
      }

      const animal = await prisma.animal.findUnique({
        where: { slug: animalSlug }
      });

      if (!animal) {
        return res.status(404).json({ message: "Animal nao encontrado." });
      }

      if (animal.status !== "DISPONIVEL") {
        return res.status(409).json({ message: "Este animal nao esta mais disponivel para adocao." });
      }

      const adoptionRequest = await prisma.adoptionRequest.create({
        data: {
          animalId: animal.id,
          observacao
        }
      });

      await prisma.animal.update({
        where: { id: animal.id },
        data: { status: "EM_PROCESSO" }
      });

      return res.status(201).json({
        id: adoptionRequest.id,
        animal: {
          id: animal.id,
          nome: animal.nome,
          slug: animal.slug
        },
        observacao: adoptionRequest.observacao,
        createdAt: adoptionRequest.createdAt,
        statusAnimal: "EM_PROCESSO"
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  });

  return router;
}

module.exports = {
  createAdoptionsRouter
};
