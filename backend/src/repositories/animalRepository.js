function createAnimalRepository(prisma) {
  return {
    findMany() {
      return prisma.animal.findMany({
        orderBy: { nome: "asc" }
      });
    },

    findBySlug(slug) {
      return prisma.animal.findUnique({
        where: { slug }
      });
    },

    updateStatusById(id, status) {
      return prisma.animal.update({
        where: { id },
        data: { status }
      });
    }
  };
}

module.exports = {
  createAnimalRepository
};
