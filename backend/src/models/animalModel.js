function mapAnimal(animal) {
  return {
    id: animal.id,
    slug: animal.slug,
    nome: animal.nome,
    especie: animal.especie,
    raca: animal.raca,
    sexo: animal.sexo,
    porte: animal.porte,
    corPelagem: animal.corPelagem,
    idadeAproximada: animal.idadeAproximada,
    dataNascimentoAproximada: animal.dataNascimentoAproximada,
    dataVacinacaoAntirrabica: animal.dataVacinacaoAntirrabica,
    dataVermifugacao: animal.dataVermifugacao,
    castrado: animal.castrado,
    sociavelOutrosAnimais: animal.sociavelOutrosAnimais,
    descricao: animal.descricao,
    imagem: animal.imagem,
    status: animal.status
  };
}

module.exports = {
  mapAnimal
};
