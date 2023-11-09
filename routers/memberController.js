const express = require("express");
const router = express.Router();
const { Member } = require("../models/member");

router.post("/member", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).send({ err: "name is required" });
    const member = new Member(req.body);
    await member.save();
    return res.send({ member });
  } catch (error) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});
module.exports = router;
