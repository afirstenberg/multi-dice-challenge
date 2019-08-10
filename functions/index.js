const Multivocal = require('multivocal');

require('./action').init();

exports.assistant = Multivocal.processFirebaseWebhook;
