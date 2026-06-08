function createAdoptionRepository(prisma) {
  return {
    findManyWithAnimals() {
      return prisma.adoptionRequest.findMany({
        include: { animal: true },
        orderBy: { createdAt: "desc" }
      });
    },

    create(animalId, observacao) {
      return prisma.adoptionRequest.create({
        data: {
          animalId,
          observacao
        }
      });
    }
  };
}

module.exports = {
  createAdoptionRepository
};
