const { AppError } = require("../utils/appError");
const { mapAnimal } = require("../models/animalModel");

function createAnimalsService({ animalRepository }) {
  return {
    async listAnimals() {
      const animals = await animalRepository.findMany();
      return animals.map(mapAnimal);
    },

    async getAnimalBySlug(slug) {
      const animal = await animalRepository.findBySlug(slug);

      if (!animal) {
        throw new AppError(404, "Animal nao encontrado.");
      }

      return mapAnimal(animal);
    }
  };
}

module.exports = {
  createAnimalsService
};
