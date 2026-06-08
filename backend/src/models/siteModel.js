function mapSiteContent(siteContent, socials, testimonials) {
  return {
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
}

module.exports = {
  mapSiteContent
};
