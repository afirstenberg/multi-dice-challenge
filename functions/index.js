const Multivocal = require('multivocal');

require('./action').init();
require('./leaderboard').init();

exports.assistant = Multivocal.processFirebaseWebhook;
