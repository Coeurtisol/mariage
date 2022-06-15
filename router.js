import express from "express";
import path from "path";
import inviteController from "./controller/inviteController.js";

const router = express.Router();

router.post("/valider_formulaire_invite", inviteController.newInvite);
router.get("/api/invite", inviteController.getAll);
router.get("/api/invite/:id", inviteController.findById);

router.get("/admin",(req, res) => {
  res.sendFile(path.resolve() + "/public/admin.html");
})
router.get("/*", (req, res) => {
  res.sendFile(path.resolve() + "/public/index.html");
});

export default router;
