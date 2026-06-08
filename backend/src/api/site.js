const { Router } = require("express");

function createSiteRouter(prisma) {
  const router = Router();

  router.get("/", async (req, res) => {
    try {
      const siteContent = await prisma.siteContent.findUnique({ where: { id: 1 } });
      const socials = await prisma.socialLink.findMany({
        orderBy: { displayOrder: "asc" }
      });
      const testimonials = await prisma.testimonial.findMany({
        where: { active: true },
        orderBy: { displayOrder: "asc" }
      });

      if (!siteContent) {
        return res.status(404).json({ message: "Conteudo do site nao encontrado." });
      }

      const response = {
        home: {
          titleHtml: siteContent.homeTitleHtml,
          description: siteContent.homeDescription,
          ctaButtonLabel: siteContent.ctaButtonLabel,
          phoneLabel: siteContent.phoneLabel
        },
        pets: {
          titleHtml: siteContent.petsSectionTitleHtml,
          subtitle: siteContent.petsSectionSubtitle
        },
        testimonials: {
          title: siteContent.testimonialsSectionTitle,
          subtitle: siteContent.testimonialsSectionSubtitle,
          items: testimonials.map((item) => ({
            name: item.name,
            message: item.message,
            rating: item.rating,
            avatar: item.avatar
          }))
        },
        footer: {
          copyright: siteContent.footerCopyright
        },
        socialLinks: {
          home: socials
            .filter((item) => item.location === "HOME")
            .map((item) => ({ platform: item.platform, url: item.url })),
          footer: socials
            .filter((item) => item.location === "FOOTER")
            .map((item) => ({ platform: item.platform, url: item.url }))
        }
      };

      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  });

  return router;
}

module.exports = {
  createSiteRouter
};
