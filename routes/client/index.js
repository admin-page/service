const router = require("express").Router();
const { verifyToken } = require("../../helpers");

//Route CRUD User
router.get("/", require("./controller").getUser);
router.get("/:search", require("./controller").getUserName);
router.post("/", require("./controller").createUser);
router.put("/:id", require("./controller").updateUser);
router.delete("/:id", require("./controller").deleteUser);

//Route Login
router.post("/login", require("./controller").login);

//Route Logout
router.get("/logout", require("./controller").logout);

module.exports = router;
