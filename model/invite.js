import prisma from "./Prisma.js";

const { invite } = prisma;

export default class Invite {
  data = {};

  constructor({
    nom,
    prenom,
    vientCeremonie,
    vientVinDHonneur,
    vientRepas,
    repas,
  }) {
    this.data.nom = nom;
    this.data.prenom = prenom;
    this.data.vientCeremonie = vientCeremonie;
    this.data.vientVinDHonneur = vientVinDHonneur;
    this.data.vientRepas = vientRepas;
    this.data.repasId = Number(repas) || undefined;
  }

  save = async () => {
    const newInvite = await invite.create({
      data: this.data,
    });
    return newInvite;
  };

  static getAll = async () => {
    const invites = await invite.findMany({
      select: {
        id: true,
        nom: true,
        prenom: true,
        vientCeremonie: true,
        vientVinDHonneur: true,
        vientRepas: true,
        repas: true,
      },
    });
    return invites;
  };

  static findById = async (id) => {
    const inviteTrouve = await invite.findUnique({
      where: {
        id,
      },
    });
    console.log("inviteTrouve", inviteTrouve);
    return inviteTrouve;
  };
}
