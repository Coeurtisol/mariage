import prisma from "../model/prisma.js";

async function getAll(req, res) {
  try {
    const repas = await prisma.repas.findMany();
    // console.log(repas);
    res.status(200).json(repas);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export default {
  getAll,
};
