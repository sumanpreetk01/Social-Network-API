const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/").get(userController.getAllUsers).post(userController.createUser);

router.route('/:userId')
    .get(userController.getOneUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

router.route('//users/:userId/friends/:friendId')
    .post(userController.addFriend)
    .delete(userController.removeFriend)

module.exports = router;
