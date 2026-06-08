function createSiteRepository(prisma) {
  return {
    findContent() {
      return prisma.siteContent.findUnique({ where: { id: 1 } });
    },

    findSocialLinks() {
      return prisma.socialLink.findMany({
        orderBy: { displayOrder: "asc" }
      });
    },

    findActiveTestimonials() {
      return prisma.testimonial.findMany({
        where: { active: true },
        orderBy: { displayOrder: "asc" }
      });
    }
  };
}

module.exports = {
  createSiteRepository
};
