const router = require("express").Router()
const { signin , signup } = require("../Controllers/userC")

router.post("/signin", signin);
router.post("/signup", signup);

module.exports = router;