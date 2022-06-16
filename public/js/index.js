let id;
const form = document.querySelector("#form-invitation");
const inputPrenom = document.querySelector("#input-prenom");
const inputNom = document.querySelector("#input-nom");
const inputVientCeremonie = document.querySelector("#input-vient-ceremonie");
const inputVientVinDHonneur = document.querySelector(
  "#input-vient-vin-dhonneur"
);
const inputVientRepas = document.querySelector("#input-vient-repas");
const choixRepasContainer = document.querySelector("#choix-repas-container");
const repasSection = document.querySelector("#repas-section");

const listeRepas = ["Boeuf", "Poisson", "Végé"];
let choixRepasRequired = true;

/**
 * @param {String[]} listeRepas
 */
function buildListeRepas(listeRepas) {
  const listeRadioRepas = listeRepas
    .map(
      (repas) =>
        `<div>
        <input
          type="radio"
          name="input-repas"
          id="repas-${repas}"
          value=${repas}
          required
        />
        <label for="repas-${repas}">${repas}</label>
      </div>`
    )
    .join("");
  choixRepasContainer.innerHTML = listeRadioRepas;
}
buildListeRepas(listeRepas);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  prepareForm();
});

async function prepareForm() {
  const prenom = inputPrenom.value;
  const nom = inputNom.value;
  const vientCeremonie = inputVientCeremonie.checked;
  const vientVinDHonneur = inputVientVinDHonneur.checked;
  const vientRepas = inputVientRepas.checked;

  const data = {
    prenom,
    nom,
    vientCeremonie,
    vientVinDHonneur,
    vientRepas,
  };
  if (vientRepas) {
    const repas = document.querySelector(
      'input[name="input-repas"]:checked'
    ).value;
    data.repas = repas;
  }
  console.log("data", data);
  if (id) sendUpdateInvite(data);
  else sendNewInvite(data);
}

async function sendUpdateInvite(data) {
  try {
    console.log("put");
    const response = await axios.put(`/api/invite/${id}`, data);
    // console.log("response", response);
    alert('Modifications enregistrées')
    window.location = "/";
  } catch (error) {
    console.log("error", error);
  }
}

async function sendNewInvite(data) {
  try {
    console.log("post");
    const response = await axios.post("/valider_formulaire_invite", data);
    console.log("response", response);
    form.reset();
    choixRepasRequired = true;
    changeRequiredRadioRepas(choixRepasRequired);
    changeDisplayRepasSection(choixRepasRequired);
  } catch (error) {
    console.log("error", error);
  }
}

inputVientRepas.addEventListener("change", (e) => {
  choixRepasRequired = !choixRepasRequired;
  changeRequiredRadioRepas(choixRepasRequired);
  changeDisplayRepasSection(choixRepasRequired);
});

/**
 * @param {Boolean} repasRequired
 */
function changeRequiredRadioRepas(repasRequired) {
  document.querySelectorAll('input[name="input-repas"]').forEach((input) => {
    input.required = repasRequired;
  });
}

/**
 * @param {Boolean} repasRequired
 */
function changeDisplayRepasSection(repasRequired) {
  repasSection.style.display = repasRequired ? "block" : "none";
}

function getInviteIdInUrl() {
  id = window.location.pathname.substring(1);
  console.log(id);
  if (id) FetchInviteById(id);
}
getInviteIdInUrl();

async function FetchInviteById(id) {
  try {
    const response = await axios.get(`/api/invite/${id}`);
    console.log(response);
    if (response.data) {
      fillForm(response.data);
    }
  } catch (error) {
    console.log(error);
  }
}

function fillForm(invite) {
  inputPrenom.value = invite.prenom;
  inputNom.value = invite.nom;
  inputVientCeremonie.checked = invite.vientCeremonie;
  inputVientVinDHonneur.checked = invite.vientVinDHonneur;
  inputVientRepas.checked = invite.vientRepas;
  choixRepasRequired = invite.vientRepas;
  changeRequiredRadioRepas(choixRepasRequired);
  changeDisplayRepasSection(choixRepasRequired);
  document.querySelectorAll('input[name="input-repas"]').forEach((input) => {
    if (input.value === invite.repas) {
      input.checked = true;
    } else input.checked = false;
  });
}
