const { Schema, model } = require('mongoose');
const Reaction =require('./Reaction');
const { startSession } = require('./User');
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
      //get: dateMade
    
    },
    username:{
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

//virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

//function to set date
// function dateMade(createdAt){

// }

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
