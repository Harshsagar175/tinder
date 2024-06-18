const { signup, login, checkAuth } = require("../controllers/authController");
const { getMessages, addMessage } = require("../controllers/messageController");
const {
  getUsers,
  addToFav,
  addToDis,
  getFromFav,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

// AUTHENTICATION ROUTES
router.post("/signup", signup);
router.post("/login", login);
router.get("/checkAuth", verifyToken, checkAuth);

// USER ROUTES
router.get("/getUsers", getUsers);
router.put("/addToFav/:id", verifyToken, addToFav);
router.put("/addToDis/:id", verifyToken, addToDis);
router.get("/getFromFav", verifyToken, getFromFav);

// MESSAGE ROUTES
router.post("/getMsg", getMessages);
router.post("/addMsg", addMessage);

module.exports = router;
