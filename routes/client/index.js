const router = require("express").Router();

router.get("/get", require("./controller").get);
router.post("/add", require("./controller").create);

module.exports = router;
