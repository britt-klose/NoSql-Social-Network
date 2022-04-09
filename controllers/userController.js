
const { User, Thought } = require('../models');

module.exports = {
  // Get all Users
  getUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
  },
  // Get a single User and all assoc friends & thoughts
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userid })
      .select('-__v')
      .lean()
      .then(async(user) =>
        !user
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Create a new User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  
  // Delete a User and their associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userid })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such User exists' })
          : Thought.deleteMany({ _id: { $in: user.thoughts} })
      )
        .then(() => res.json({ message: 'User and thoughts deleted!' }))
        .catch((err) => res.status(500).json(err));   
  },

  //Update a user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userid },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a new friend to a User's friend list using user_id and friend_id
  addFriend(req, res) {
    console.log('You are adding a new friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userid },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No User found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend from a User's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userid },
      { $pull: { friend: { friendid: req.params.friendid } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No User found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};