const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/usersController");

router.post("/login/", authController.login);
router.post("/logout/id=:id", authController.logout);
router.post("/register/", authController.register);

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/id=:id", userController.getUserById);
router.put("/id=:id", userController.updateUser);
router.post(
  "/updateAvatar",
  userController.upload.single("avatar"),
  userController.updateAvatar
);
router.post("/sendFriendRequest", userController.sendFriendRequest);
router.post("/acceptFriendRequest", userController.acceptFriendRequest);

module.exports = router;
