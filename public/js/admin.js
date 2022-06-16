const invitesContainer = document.querySelector("tbody");
const nbInvitesContainer = document.querySelector("#nb-invite");
const nbAbsentsContainer = document.querySelector("#nb-absents");
const nbVientCeremonieContainer = document.querySelector("#nb-vient-ceremonie");
const nbVientVinDHonneurContainer = document.querySelector(
  "#nb-vient-vin-dhonneur"
);
const nbVientRepasContainer = document.querySelector("#nb-vient-repas");
const nbRepasContainer = document.querySelector("#nb-repas-container");

const stats = {
  nbAbsents: 0,
  nbVientCeremonie: 0,
  nbVientVinDHonneur: 0,
  nbVientRepas: 0,
  repas: {},
};

async function getAllInvites() {
  try {
    const response = await axios.get("/api/invite");
    console.log("response", response.data);
    makeListeInvites(response.data);
    showStatistics(response.data);
  } catch (error) {
    console.log(error);
  }
}
getAllInvites();

function makeListeInvites(listeInvites) {
  listeInvites.forEach((i) => {
    setStatistics(i);
    const ligneInvite = `<tr>
              <td><a href="/${i.id}">${i.id}</a></td>
              <td>${i.prenom}</td>
              <td>${i.nom}</td>
              <td>${i.vientCeremonie ? "X" : ""}</td>
              <td>${i.vientVinDHonneur ? "X" : ""}</td>
              <td>${i.repas || ""}</td>
            </tr>`;
    invitesContainer.insertAdjacentHTML("beforeend", ligneInvite);
  });
}

function setStatistics(invite) {
  if (!invite.vientCeremonie && !invite.vientVinDHonneur && !invite.vientRepas)
    stats.nbAbsents++;
  if (invite.vientCeremonie) stats.nbVientCeremonie++;
  if (invite.vientVinDHonneur) stats.nbVientVinDHonneur++;
  if (invite.vientRepas) {
    stats.nbVientRepas++;
    if (stats.repas[invite.repas] == undefined) stats.repas[invite.repas] = 1;
    else stats.repas[invite.repas]++;
  }
  //   console.log("stats", stats);
}

function showStatistics(listeInvites) {
  console.log("stats", stats);
  nbAbsentsContainer.innerText = stats.nbAbsents;
  nbInvitesContainer.innerText = listeInvites.length;
  nbVientCeremonieContainer.innerText = stats.nbVientCeremonie;
  nbVientVinDHonneurContainer.innerText = stats.nbVientVinDHonneur;
  nbVientRepasContainer.innerText = stats.nbVientRepas;
  buildStatsRepas();
}

function buildStatsRepas() {
  const listeDivRepas = Object.entries(stats.repas)
    .map(
      (repas) =>
        `<div>
            - ${repas[0]} : ${repas[1]}
          </div>`
    )
    .join("");
  nbRepasContainer.innerHTML = listeDivRepas;
}
buildStatsRepas();
