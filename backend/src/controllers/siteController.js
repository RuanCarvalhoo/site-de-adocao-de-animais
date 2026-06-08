function createSiteController({ siteService }) {
  return {
    async get(req, res) {
      const siteContent = await siteService.getSiteContent();
      return res.json(siteContent);
    }
  };
}

module.exports = {
  createSiteController
};
