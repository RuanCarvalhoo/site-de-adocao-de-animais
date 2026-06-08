function mapAdoptionRequest(request) {
  return {
    id: request.id,
    animal: {
      id: request.animal.id,
      nome: request.animal.nome,
      slug: request.animal.slug,
      status: request.animal.status
    },
    observacao: request.observacao,
    createdAt: request.createdAt
  };
}

function mapCreatedAdoption(adoptionRequest, animal) {
  return {
    id: adoptionRequest.id,
    animal: {
      id: animal.id,
      nome: animal.nome,
      slug: animal.slug
    },
    observacao: adoptionRequest.observacao,
    createdAt: adoptionRequest.createdAt,
    statusAnimal: "EM_PROCESSO"
  };
}

module.exports = {
  mapAdoptionRequest,
  mapCreatedAdoption
};
