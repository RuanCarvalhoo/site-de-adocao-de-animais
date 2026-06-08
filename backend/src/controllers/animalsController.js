function createAnimalsController({ animalsService }) {
  return {
    async list(req, res) {
      const animals = await animalsService.listAnimals();
      return res.json(animals);
    },

    async getBySlug(req, res) {
      const animal = await animalsService.getAnimalBySlug(req.params.slug);
      return res.json(animal);
    }
  };
}

module.exports = {
  createAnimalsController
};
