const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,

} = require('../../controllers/thoughtController.js');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router
  .route('/:thoughtid')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);
  
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtid/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionid
router.route('/:thoughtid/reactions/:reactionid').delete(removeReaction);

module.exports = router;

