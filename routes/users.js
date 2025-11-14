const express = require("express");
const router = express.Router();

const {
    list,
    addUser,
    putUser,
    deleteUser,
    userLogin
} = require("../controllers/userControllers");

router.get("/", list);
router.post("/", addUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);
router.post("/login", userLogin);

module.exports = router;
