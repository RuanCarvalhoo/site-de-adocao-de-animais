const { AppError } = require("../utils/appError");
const { mapAdoptionRequest, mapCreatedAdoption } = require("../models/adoptionModel");

function createAdoptionsService({ adoptionRepository, animalRepository }) {
  return {
    async listRequests() {
      const requests = await adoptionRepository.findManyWithAnimals();
      return requests.map(mapAdoptionRequest);
    },

    async createRequest(payload) {
      const { animalSlug, observacao } = payload;

      if (!animalSlug) {
        throw new AppError(400, "Informe o slug do animal.");
      }

      const animal = await animalRepository.findBySlug(animalSlug);

      if (!animal) {
        throw new AppError(404, "Animal nao encontrado.");
      }

      if (animal.status !== "DISPONIVEL") {
        throw new AppError(409, "Este animal nao esta mais disponivel para adocao.");
      }

      const adoptionRequest = await adoptionRepository.create(animal.id, observacao);
      await animalRepository.updateStatusById(animal.id, "EM_PROCESSO");

      return mapCreatedAdoption(adoptionRequest, animal);
    }
  };
}

module.exports = {
  createAdoptionsService
};
