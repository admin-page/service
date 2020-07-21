const router = require("express").Router();

router.get("/get", require("./controller").getUsers);
router.post("/add", require("./controller").createUsers);

module.exports = router;
