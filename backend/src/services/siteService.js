const { AppError } = require("../utils/appError");
const { mapSiteContent } = require("../models/siteModel");

function createSiteService({ siteRepository }) {
  return {
    async getSiteContent() {
      const [siteContent, socials, testimonials] = await Promise.all([
        siteRepository.findContent(),
        siteRepository.findSocialLinks(),
        siteRepository.findActiveTestimonials()
      ]);

      if (!siteContent) {
        throw new AppError(404, "Conteudo do site nao encontrado.");
      }

      return mapSiteContent(siteContent, socials, testimonials);
    }
  };
}

module.exports = {
  createSiteService
};
