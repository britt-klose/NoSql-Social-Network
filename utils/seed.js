const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getUserName, getRandomReactions, getRandomThought, getMyThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  //Create empty array to hold the names
  const users=[];

 // Loop 8 times -- add users to the user array
 for (let i = 0; i < 8; i++) {
  // Get some random thought objects using a helper function that we imported from ./data
  const newThought = getMyThoughts(8);
  const myFriends= getFriends()
  const username = getUserName();

  users.push({
    newThought,
    username,
    myFriends
  });
}

  // Create empty array to hold the thoughts
  const thoughts = [];

  // Loop 20 times -- add thoughts to the thoughts array
  for (let i = 0; i < 9; i++) {
    // Get some random reaction objects using a helper function that we imported from ./data
    const reactions = getRandomReactions(9);

    const userThought = getRandomThought();

    thoughts.push({
      userThought,
      reactions,
    });
  }

  // Add thoughtss to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});