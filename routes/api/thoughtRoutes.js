const router = require("express").Router();
const thoughtController = require("../../controllers/thoughtController");

router.route("/").get(thoughtController.getAllThoughts).post(thoughtController.createThought);

router.route('/:thoughtId')
    .get(thoughtController.getOneThought)
    .put(thoughtController.updateThought)
    .delete(thoughtController.deleteThought);

router.route('/:thoughtId/reactions')
    .post(thoughtController.createReaction)
    .delete(thoughtController.deleteReaction);


module.exports = router;