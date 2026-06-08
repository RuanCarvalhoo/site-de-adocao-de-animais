const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.siteContent.upsert({
    where: { id: 1 },
    update: {
      homeTitleHtml: 'Caudas <span>felizes</span>, familias <span>felizes</span>.',
      homeDescription: 'Mais que um site, uma ponte para o amor de quatro patas.',
      ctaButtonLabel: 'AUmigos disponiveis',
      phoneLabel: '(81)91234-5678',
      petsSectionTitleHtml: '<strong>Aumigos</strong>',
      petsSectionSubtitle: 'Aumigos disponiveis para adocao',
      testimonialsSectionTitle: 'Depoimentos',
      testimonialsSectionSubtitle: 'O que os clientes falam sobre nosso trabalho',
      footerCopyright: '&copy 2026 Rayssa Vitoria'
    },
    create: {
      id: 1,
      homeTitleHtml: 'Caudas <span>felizes</span>, familias <span>felizes</span>.',
      homeDescription: 'Mais que um site, uma ponte para o amor de quatro patas.',
      ctaButtonLabel: 'AUmigos disponiveis',
      phoneLabel: '(81)91234-5678',
      petsSectionTitleHtml: '<strong>Aumigos</strong>',
      petsSectionSubtitle: 'Aumigos disponiveis para adocao',
      testimonialsSectionTitle: 'Depoimentos',
      testimonialsSectionSubtitle: 'O que os clientes falam sobre nosso trabalho',
      footerCopyright: '&copy 2026 Rayssa Vitoria'
    }
  });

  const socialLinks = [
    { platform: 'whatsapp', url: 'https://wa.me/5581912345678', location: 'HOME', displayOrder: 1 },
    { platform: 'instagram', url: 'https://www.instagram.com/', location: 'HOME', displayOrder: 2 },
    { platform: 'facebook', url: 'https://www.facebook.com/', location: 'HOME', displayOrder: 3 },
    { platform: 'whatsapp', url: 'https://wa.me/5581912345678', location: 'FOOTER', displayOrder: 1 },
    { platform: 'instagram', url: 'https://www.instagram.com/', location: 'FOOTER', displayOrder: 2 },
    { platform: 'facebook', url: 'https://www.facebook.com/', location: 'FOOTER', displayOrder: 3 }
  ];

  for (const socialLink of socialLinks) {
    await prisma.socialLink.upsert({
      where: {
        platform_location: {
          platform: socialLink.platform,
          location: socialLink.location
        }
      },
      update: socialLink,
      create: socialLink
    });
  }

  const testimonials = [
    {
      code: 'maria',
      name: 'Maria',
      message: 'Encontrei meu melhor amigo. Da para ver como os bichanos sao tratados com amor.',
      rating: 5,
      avatar: 'src/images/avatar.png',
      active: true,
      displayOrder: 1
    },
    {
      code: 'claudia',
      name: 'Claudia',
      message: 'Bichinhos muito bem cuidados, adotem! Voces nao irao se arrepender.',
      rating: 5,
      avatar: 'src/images/avatar.png',
      active: true,
      displayOrder: 2
    },
    {
      code: 'joao',
      name: 'Joao',
      message: 'Processo de adocao simples e com muito cuidado com os animais.',
      rating: 5,
      avatar: 'src/images/avatar.png',
      active: true,
      displayOrder: 3
    },
    {
      code: 'paula',
      name: 'Paula',
      message: 'Equipe atenciosa e pets muito bem cuidados. Recomendo!',
      rating: 5,
      avatar: 'src/images/avatar.png',
      active: true,
      displayOrder: 4
    }
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { code: testimonial.code },
      update: testimonial,
      create: testimonial
    });
  }

  const animais = [
    {
      slug: "bob",
      nome: "Bob",
      especie: "Cachorro",
      raca: "Sem Raca Definida",
      sexo: "Macho",
      porte: "Grande",
      corPelagem: "Marrom",
      idadeAproximada: "5 anos e 10 meses",
      dataNascimentoAproximada: "06/06/2020",
      dataVacinacaoAntirrabica: "06/08/2025",
      dataVermifugacao: "06/07/2025",
      castrado: true,
      sociavelOutrosAnimais: true,
      descricao: "Cachorro de grande porte, muito docil.",
      imagem: "src/images/cachorrogrande.png"
    },
    {
      slug: "mia",
      nome: "Mia",
      especie: "Gato",
      raca: "SRD",
      sexo: "Femea",
      porte: "Pequeno",
      corPelagem: "Cinza",
      idadeAproximada: "1 ano",
      dataNascimentoAproximada: "02/05/2025",
      dataVacinacaoAntirrabica: "10/04/2026",
      dataVermifugacao: "19/04/2026",
      castrado: true,
      sociavelOutrosAnimais: true,
      descricao: "Gata carinhosa e sociavel.",
      imagem: "src/images/gatocinza.png"
    },
    {
      slug: "fred",
      nome: "Fred",
      especie: "Cachorro",
      raca: "Dachshund",
      sexo: "Macho",
      porte: "Pequeno",
      corPelagem: "Preto",
      idadeAproximada: "8 anos e 3 meses",
      dataNascimentoAproximada: "25/05/2018",
      dataVacinacaoAntirrabica: "24/08/2025",
      dataVermifugacao: "11/07/2025",
      castrado: true,
      sociavelOutrosAnimais: true,
      descricao: "Pequeno, energico e brincalhao.",
      imagem: "src/images/cachorrosalsicha.png"
    },
    {
      slug: "simba",
      nome: "Simba",
      especie: "Gato",
      raca: "SRD",
      sexo: "Macho",
      porte: "Pequeno",
      corPelagem: "Laranja",
      idadeAproximada: "10 meses",
      dataNascimentoAproximada: "28/06/2025",
      dataVacinacaoAntirrabica: "10/04/2026",
      dataVermifugacao: "19/04/2026",
      castrado: false,
      sociavelOutrosAnimais: true,
      descricao: "Gatinho jovem e muito ativo.",
      imagem: "src/images/gatolaranja.png"
    }
  ];

  for (const animal of animais) {
    await prisma.animal.upsert({
      where: { slug: animal.slug },
      update: animal,
      create: animal
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
