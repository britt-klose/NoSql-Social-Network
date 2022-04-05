const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      //user getter method to format timestamp on query
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    reactions: [
        //replies
        //Array of nested documents created with the reactionSchema
        //Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
        //make subdoc for reactions
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Course = model('course', courseSchema);

module.exports = Course;
