function createAdoptionsController({ adoptionsService }) {
  return {
    async list(req, res) {
      const requests = await adoptionsService.listRequests();
      return res.json(requests);
    },

    async create(req, res) {
      const createdRequest = await adoptionsService.createRequest(req.body);
      return res.status(201).json(createdRequest);
    }
  };
}

module.exports = {
  createAdoptionsController
};
