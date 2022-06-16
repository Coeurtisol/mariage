import Invite from "../model/invite.js";

async function getAll(req, res) {
  try {
    const invites = await Invite.getAll();
    res.json(invites);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

async function findById(req, res) {
  try {
    const id = Number(req.params.id);
    const invite = await Invite.findById(id);
    res.json(invite);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

async function newInvite(req, res) {
  const data = req.body;
  try {
    const newInvite = await new Invite(data).save();
    res.json(newInvite);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

async function updateOne(req, res) {
  const id = Number(req.params.id);
  const data = { ...req.body, id };
  try {
    const updatedInvite = await Invite.updateOne(data);
    res.json(updatedInvite);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export default {
  getAll,
  findById,
  newInvite,
  updateOne,
};
