const express = require("express");
const router = express.Router();
const { Member } = require("../models/member");

router.post("/member", async (req, res) => {
  const member = new Member(req.body);
  await member.save();
  return res.send({ member });
});
router.get("/member", async (req, res) => {
  const members = await Member.find({});
  return res.send({ members });
});

router.get("/member/:memberId", async (req, res) => {
  const { memberId } = req.params;
  const member = await Member.findById(memberId);
  return res.send({ member });
});

module.exports = router;
