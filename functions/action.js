const Multivocal = require('multivocal');
const Util = require('multivocal/lib/util');

const enWelcome = [
  "Welcome back to multi dice championship!",
  "Good to see you again."
];

const enQuit = [
  {
    Base: {Set:true},
    ShouldClose: true
  },
  "Hope to see you again soon as you fight for the multi dice championship!",
  "Looking forward to your return to the multi dice championship!"
];

const enUnknown = [
  "Would you like me to roll the dice?"
];

const enRoll = [
  "You've rolled a {{total}}.",
  "Your total is {{total}}."
];

/**
 * Roll a die, generating a number from 1 to "sides" inclusive
 * @param sides How many sides the die has
 * @return {number} A random number between 1 and "sides" inclusive
 */
function rollDie( sides ){
  return Math.ceil( Math.random() * sides );
}

/**
 * Roll some number of dice of the same number of sides, returning the values rolled
 * @param num How many dice to roll?
 * @param sides How many sides should they have?
 * @return {Array} The values of each die rolled
 */
function roll( num, sides ){
  let ret = [];
  for( let co=0; co<num; co++ ){
    ret.push( rollDie(sides) );
  }
  return ret;
}

function handleRoll( env ){
  // Roll the dice
  let dice = roll( 10, 6 );
  env.dice = dice;

  // Add them up to get the total
  let total = dice.reduce( (total, val) => total + val );
  env.total = total;

  // TODO: Check if this is a new high score

  return Multivocal.handleDefault( env );
}

const enRank = [
  "Ranking is not yet implemented."
];

const enScore = [
  "High scores are not yet implemented."
];

const enSuffixDefault = [
  "Shall I roll the dice?",
  "Would you like me to roll the dice?",
  "Are you ready to roll?",
  "Are you ready to roll and rock?"
];

const enConf = {
  Response: {
    "Action.welcome":   enWelcome,
    "Action.quit":      enQuit,
    "Action.unknown":   enUnknown,
    "Action.roll":      enRoll,
    "Intent.ask.rank":  enRank,
    "Intent.ask.score": enScore
  },
  Suffix: {
    Default: enSuffixDefault
  }
};

const conf = {
  Local: {
    "und": enConf,
    "en":  enConf
  }
};

exports.init = function(){

  Multivocal.addHandler( 'Action.roll', handleRoll );

  new Multivocal.Config.Simple( conf );
};