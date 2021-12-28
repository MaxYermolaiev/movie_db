const userRoute = require("./userRoute")
const movieRoute = require("./movieRoute")

const {Router} = require('express')
const router = Router()

//here applyed set routers in Movie and User router and after it will transfer to app.use()
router.use("", userRoute);
router.use("", movieRoute);

module.exports = router;