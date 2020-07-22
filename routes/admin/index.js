const router = require("express").Router();
const { verifyToken } = require("../../helpers");

//Route CRUD Admin
router.get("/", verifyToken, require("./controller").getAdmin);
router.get("/:username", require("./controller").getAdminName);
router.post("/", require("./controller").createAdmin);
router.put("/:id", require("./controller").updateAdmin);
router.delete("/:id", require("./controller").deleteAdmin);

//Route Login
router.post("/login", require("./controller").login);

//Route Logout
router.get("/logout", require("./controller").logout);

module.exports = router;
