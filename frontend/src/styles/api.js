const API_BASE = "/api";
const INITIAL_TESTIMONIALS_VISIBLE = 2;
let allTestimonials = [];
let showingAllTestimonials = false;

function formatBoolean(value) {
  return value ? "Sim" : "Nao";
}

function getStatusPresentation(status) {
  const map = {
    DISPONIVEL: {
      label: "Disponivel para Adocao",
      className: "status-disponivel",
      disabled: false
    },
    EM_PROCESSO: {
      label: "Em processo de adocao",
      className: "status-em-processo",
      disabled: true
    },
    ADOTADO: {
      label: "Adotado",
      className: "status-adotado",
      disabled: true
    }
  };

  return map[status] || {
    label: "Indisponivel",
    className: "status-indisponivel",
    disabled: true
  };
}

function buildSocialIcon(platform) {
  const iconMap = {
    whatsapp: "fa-whatsapp",
    instagram: "fa-instagram",
    facebook: "fa-facebook"
  };

  return iconMap[platform] || "fa-link";
}

function buildSocialLinks(links) {
  return links
    .map(
      (link) =>
        `<a href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="${link.platform}"><i class="fa-brands ${buildSocialIcon(link.platform)}"></i></a>`
    )
    .join("");
}

function buildStars(rating) {
  return Array.from({ length: rating }, () => '<i class="fa-solid fa-star"></i>').join("");
}

function buildTestimonialCard(item) {
  return `
    <div class="feedback">
      <img src="${item.avatar}" class="feedback-avatar" alt="Avatar de ${item.name}">
      <div class="feedback-content">
        <div class="feedback-header">
          <span class="feedback-name">${item.name}</span>
          <span class="feedback-stars">${buildStars(item.rating)}</span>
        </div>
        <p class="feedback-message">"${item.message}"</p>
      </div>
    </div>
  `;
}

function renderTestimonials() {
  const testimonialsList = document.getElementById("testimonials_list");
  const button = document.getElementById("btn_ver_mais");

  if (!testimonialsList || !button) {
    return;
  }

  const currentTestimonials = showingAllTestimonials
    ? allTestimonials
    : allTestimonials.slice(0, INITIAL_TESTIMONIALS_VISIBLE);

  testimonialsList.innerHTML = currentTestimonials.map(buildTestimonialCard).join("");

  if (allTestimonials.length <= INITIAL_TESTIMONIALS_VISIBLE) {
    button.hidden = true;
    return;
  }

  button.hidden = false;
  button.textContent = showingAllTestimonials ? "Ver menos" : "Ver mais";
}

function bindTestimonialButton() {
  const button = document.getElementById("btn_ver_mais");

  if (!button) {
    return;
  }

  button.onclick = () => {
    showingAllTestimonials = !showingAllTestimonials;
    renderTestimonials();
  };
}

async function loadSiteContent() {
  if (!document.getElementById("home_title")) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/site`);

    if (!response.ok) {
      throw new Error("Falha ao buscar conteudo do site");
    }

    const site = await response.json();

    document.getElementById("home_title").innerHTML = site.home.titleHtml;
    document.getElementById("home_description").textContent = site.home.description;
    document.getElementById("cta_animais_btn").textContent = site.home.ctaButtonLabel;
    document.getElementById("phone_text").textContent = site.home.phoneLabel;

    document.getElementById("pets_title").innerHTML = site.pets.titleHtml;
    document.getElementById("pets_subtitle").textContent = site.pets.subtitle;

    document.getElementById("testimonials_title").textContent = site.testimonials.title;
    document.getElementById("testimonials_subtitle").textContent = site.testimonials.subtitle;

    document.getElementById("copyright").innerHTML = site.footer.copyright;

    document.getElementById("home_social_links").innerHTML = buildSocialLinks(site.socialLinks.home);
    document.getElementById("footer_social_links").innerHTML = buildSocialLinks(site.socialLinks.footer);

    allTestimonials = site.testimonials.items;
    showingAllTestimonials = false;
    bindTestimonialButton();
    renderTestimonials();
  } catch (error) {
    console.error(error);
  }
}

function buildAnimalCard(animal) {
  const status = getStatusPresentation(animal.status);

  return `
    <div class="animal">
      <div class="pet-heart"><i class="fa-solid fa-heart"></i></div>
      <img src="${animal.imagem}" class="pet-image" width="200" alt="Foto de ${animal.nome}">
      <h3 class="pet-title">${animal.nome.toUpperCase()}</h3>
      <span class="pet-description">${animal.descricao}</span>
      <div class="pet-info">
        <a href="adocao.html?slug=${encodeURIComponent(animal.slug)}">
          <button class="btn-default ${status.className}" ${status.disabled ? "disabled" : ""}>${status.label}</button>
        </a>
      </div>
    </div>
  `;
}

async function loadAnimalsList() {
  const animalsContainer = document.getElementById("animais");
  if (!animalsContainer) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/animais`);
    if (!response.ok) {
      throw new Error("Falha ao buscar animais");
    }

    const animals = await response.json();
    animalsContainer.innerHTML = animals.map(buildAnimalCard).join("");
  } catch (error) {
    console.error(error);
    animalsContainer.innerHTML = '<p class="pet-description">Nao foi possivel carregar os animais no momento.</p>';
  }
}

async function loadAnimalDetails() {
  const slugFromQuery = new URLSearchParams(window.location.search).get("slug");
  const slug = slugFromQuery || document.body.dataset.petSlug;
  if (!slug) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/animais/${slug}`);
    if (!response.ok) {
      throw new Error("Falha ao buscar dados do pet");
    }

    const animal = await response.json();

    document.querySelector(".breadcrumb .active").textContent = animal.nome;
    document.querySelector(".pet_name").textContent = animal.nome;

    const image = document.querySelector(".pet_image_col img");
    image.src = animal.imagem;
    image.alt = `Foto de ${animal.nome}`;

    const specs = [
      ["Raca", animal.raca],
      ["Sexo", animal.sexo],
      ["Animal", animal.especie],
      ["Porte", animal.porte],
      ["Cor predominante da pelagem", animal.corPelagem],
      ["Idade aproximada", animal.idadeAproximada],
      ["Data de nascimento aproximada", animal.dataNascimentoAproximada],
      ["Data da vacinacao antirrabica", animal.dataVacinacaoAntirrabica],
      ["Data da vermifugacao", animal.dataVermifugacao],
      ["Castrado", formatBoolean(animal.castrado)],
      ["Sociavel com outros animais?", formatBoolean(animal.sociavelOutrosAnimais)]
    ];

    const specsList = document.querySelector(".pet_specs");
    specsList.innerHTML = specs
      .map(([label, value]) => `<li><strong>${label}:</strong> ${value}</li>`)
      .join("");

    const adoptButton = document.getElementById("btn_adotar_pet");
    const status = getStatusPresentation(animal.status);
    adoptButton.textContent = status.label;
    adoptButton.disabled = status.disabled;

    if (status.disabled) {
      return;
    }

    adoptButton.onclick = async () => {
      try {
        const adoptionResponse = await fetch(`${API_BASE}/adocoes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ animalSlug: slug })
        });

        const adoptionData = await adoptionResponse.json();

        if (!adoptionResponse.ok) {
          throw new Error(adoptionData.message || "Nao foi possivel registrar a solicitacao.");
        }

        alert(`Solicitacao de adocao para ${adoptionData.animal.nome} registrada com sucesso.`);
        adoptButton.disabled = true;
        adoptButton.textContent = "Em processo de adocao";
      } catch (error) {
        alert(error.message);
      }
    };
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadSiteContent();
  loadAnimalsList();
  loadAnimalDetails();
});
