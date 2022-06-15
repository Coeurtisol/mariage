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
    this.data.repas = repas;
  }

  save = async () => {
    const newInvite = await invite.create({
      data: this.data,
    });
    console.log("invite - save", newInvite);
    return newInvite;
  };

  static getAll = async () => {
    const invites = await invite.findMany();
    console.log("invite - getall", invites);
    return invites;
  };

  static findById = async (id) => {
    const inviteTrouve = await invite.findUnique({
      where: {
        id,
      },
    });
    console.log("invite - findById", inviteTrouve);
    return inviteTrouve;
  };
}
