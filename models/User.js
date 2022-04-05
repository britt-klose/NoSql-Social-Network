const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create Student model
const studentSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
     // (match valid email: mongoose match validation)
    },
    thoughts: [thoughtSchema],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    //array of id vals ref user model (self-reference)
    //create virtual called friendCount
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
