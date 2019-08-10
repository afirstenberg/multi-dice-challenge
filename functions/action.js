const Multivocal = require('multivocal');

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
  new Multivocal.Config.Simple( conf );
};