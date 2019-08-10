const Multivocal = require('multivocal');
const Util = require('multivocal/lib/util');

function buildHighScore( env ){
  env.highScore = Util.objPathsDefault( env, 'User/State/highScore', 0 );
  return Promise.resolve( env );
}

function conditionallySetHighScore( env ){
  if( env.total > env.highScore ){
    env.isNewHighScore = true;
    env.highScore = env.total;
    Util.setObjPath( env, 'User/State/highScore', env.highScore );

  } else {
    env.isNewHighScore = false;
  }

  return Promise.resolve( env );
}

const enWelcome1 = [
  "Welcome to multi dice championship. "+
    "I'll roll ten dice for you, and tell you your score. "+
    "Your goal is to beat your personal best and battle for the global high score. "+
    "Are you ready to get rolling?"
];

const enWelcome2 = [
  "Welcome back to multi dice championship! "+
    "This is your {{ordinalize User.State.NumVisits}} visit "+
    "and your score so far is {{highScore}}.",
  "Here on your {{ordinalize User.State.NumVisits}} visit to "+
    "multi dice championship your score so far is {{highScore}}."
];

const enWelcome = [
  "Good to see you again. Your high score is {{highScore}}.",
  "Welcome back! So far, your high score is {{highScore}}."
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
  "You've rolled {{Oxford dice}}, totalling {{total}}.",
  "Your total is {{total}} from rolling {{Oxford dice}}."
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

  // Check if this is a new high score
  return conditionallySetHighScore( env )

    // Produce responses, etc.
    .then( env => Multivocal.handleDefault( env ) );
}

const enRank = [
  "Ranking is not yet implemented."
];

const enScore = [
  "Your high score is {{highScore}}.",
  "So far, {{highScore}} is your best."
];

const enSuffixDefault = [
  "Shall I roll the dice?",
  "Would you like me to roll the dice?",
  "Are you ready to roll?",
  "Are you ready to roll and rock?"
];

const enConf = {
  Response: {
    "Action.welcome.1": enWelcome1,
    "Action.welcome.2": enWelcome2,
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
  },
  Level: {
    "Action.welcome": [
      "{{eq User.State.NumVisits 1}}",
      "{{lt User.State.NumVisits 5}}"
    ]
  }
};

exports.init = function(){

  Multivocal.addBuilder( buildHighScore );

  Multivocal.addHandler( 'Action.roll', handleRoll );

  new Multivocal.Config.Simple( conf );
};