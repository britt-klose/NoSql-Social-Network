const { User, Thought} = require("../models");

const thoughts = [
    'Here is a cool thought',
    'Have you ever noticed this?',
    'Thoughts are the windows to our deepest dreams',
    'Plastic waste is a huge problem',
    'Does anyone else think about how...',
    'One time when I was 7 I..',
    'Anyone else love when teachers help you out',
    'Raise your hand if scary movies seriously mess with your thoughts',
  ];
  
  const users=[
    'Matt Venuti',
    'Scott Calvin',
    'George Smith',
    'Michael Scott',
    'Haley Luciani',
    'TrucksMV',
    'Jim Gkonos',
    'Angela Webber',
    'Ariana Grande',
  ]
  const newReplies = [
    'This is so funny',
    'Love this',
    'Where did you get this?',
    'Nice post!',
    'Awesome!',
    'Share more!',
    'I totally agree',
    'This is so me ha',
    'Thanks for sharing.'
  ];
  
  // Get a random item given an array
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  //Get random username
const getUserName =()=>
`${getRandomArrItem(users)}`;

//function to generate random thoughts to add to name object
const getMyThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughts: getRandomArrItem(thoughts)
    });
  }
  return results;
};

  // Gets a random thought
  const getRandomThought = () =>
    `${getRandomArrItem(thoughts)}`;
  
  // Function to generate random reactions that we can add to thought object.
  const getRandomReactions = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandomArrItem(newReplies)
      });
    }
    return results;
  };
  
  //Function to add random friends to name object
const getFriends=(int)=> {
  const results=[];
  for (let i = 0; i < int; i++) {
    results.push({
      friends: getRandomArrItem(users),
    });
  }
  return results;
}
  // Export the functions for use in seed.js
  module.exports = { getRandomThought, getRandomReactions, getFriends, getUserName, getMyThoughts };