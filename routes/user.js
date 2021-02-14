const express = require("express");
const router = express.Router();
const User = require("../Models/user");

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.render("user/index", { users });
});
router.get("/new", (req, res) => {
  res.render("user/new");
});
router.post("/", async (req, res) => {
  const { users } = req.body;
  const user = new User(users);
  const doc = await user.save();
  res.redirect("/users");
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render("user/show", { user });
});
router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render("user/edit", { user });
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { username, age } = req.body.users;
  const user = await User.findByIdAndUpdate(id, { username, age });
  await user.save();
  res.redirect(`/users/${user._id}`);
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.redirect("/users");
});
module.exports = router;
