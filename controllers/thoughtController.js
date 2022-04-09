// ObjectId() method for converting thought Id string into an ObjectId for querying database
//const { ObjectId } = require('mongoose').Types;
const { Thought, User} = require('../models');

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single Thought by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtid })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
      return User.findOneAndUpdate(
        {_id: req.body.userid},
        {$addToSet: {thoughts: thought._id}},
        {new: true }
     )
    })
      .then((user) =>
      !user
        ? res.status(404).json({
          message: 'Thought created, but found no user with that ID',
          })
        : res.json('Created the thought 🎉')
    )
    .catch((err) =>{
      console.log(err);
        res.status(500).json(err);
    });
      // .then((thought) => res.json(thought))
      // .catch((err) => {
      //   console.log(err);
      //   return res.status(500).json(err);
      // });
  },

  // Delete a Thought by id and remove them from the user
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtid })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : User.findOneAndUpdate(
            { thoughts: req.params.thoughtid },
            { $pull: { thoughts: req.params.thoughtid } },
            { new: true }
          )
    )
    .then((user) =>
      !user
        ? res.status(404).json({
            message: 'Thought deleted, but no users found',
          })
        : res.json({ message: 'Thought successfully deleted' })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  // Update a Thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtid },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

// Add a reaction stored in a single thought's reactions array field
addReaction(req, res) {
  console.log('You are adding a reaction');
  console.log(req.body);
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtid },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: 'No thought found with that ID :(' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},

// Delete a reaction by id
//to pull and remove a reaction by the reaction's reactionId value
removeReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtid },
    { $pull: { reactions: { reactionid: req.params.reactionid } } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: 'No thought found with that ID :(' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
};
