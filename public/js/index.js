const form = document.querySelector("#form-invitation");
const choixRepasContainer = document.querySelector("#choix-repas-container");

async function getAllRepas() {
  try {
    const response = await axios.get("/api/repas");
    console.log("repas", response);
    makeListeRepas(response.data);
  } catch (error) {
    console.log(error);
  }
}
getAllRepas();

function makeListeRepas(listeRepas) {
  const listeChoix = listeRepas
    .map(
      (repas) =>
        `<div>
        <input
          type="radio"
          name="input-repas"
          id="repas-${repas.id}"
          value=${repas.id}
          required
        />
        <label for="repas-${repas.id}">${repas.libele}</label>
      </div>`
    )
    .join("");
  choixRepasContainer.innerHTML = listeChoix;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prenom = document.querySelector("#input-prenom").value;
  const nom = document.querySelector("#input-nom").value;
  const vientCeremonie = document.querySelector(
    "#input-vient-ceremonie"
  ).checked;
  const vientVinDHonneur = document.querySelector(
    "#input-vient-vin-dhonneur"
  ).checked;
  const vientRepas = document.querySelector("#input-vient-repas").checked;

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
  console.log(data);
  try {
    const response = await axios.post("/valider_formulaire_invite", data);
    console.log(response);
    form.reset();
  } catch (error) {
    console.log(error);
  }
});

document.querySelector("#input-vient-repas").addEventListener("change", (e) => {
  document.querySelectorAll('input[name="input-repas"]').forEach((input) => {
    input.required = !input.required;
    console.log(input.required);
  });
});

function urlCheck() {
  const id = window.location.pathname.substring(1);
  console.log(id);
  if (id) getInvite(id);
}
urlCheck();

async function getInvite(id) {
  try {
    const response = await axios.get(`/api/invite/${id}`);
    console.log(response);
    if (response.data) {
      updateForm(response.data);
    }
  } catch (error) {
    console.log(error);
  }
}

function updateForm(invite) {
  //todo remplir champs avec les données
}
