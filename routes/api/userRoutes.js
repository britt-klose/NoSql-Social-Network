const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
router
.route('/:userid')
.get(getSingleUser)
.delete(deleteUser)
.put(updateUser);

// /api/users/:userId/friends
router.route('/:userid/friends').post(addFriend);

// /api/user/:UserId/friendss/:friendsId
 router.route('/:userid/friends/:friendsid').delete(removeFriend);

module.exports = router;