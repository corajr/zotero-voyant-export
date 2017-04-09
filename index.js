var self = require("sdk/self");
var utils = require("./lib/utils");
var zotero = require("./lib/zotero");

var Zotero = utils.getWindow().Zotero;
var logger = new utils.Logger(Zotero);

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

function main(options, callbacks) {
  logger.info("Running");
}

exports.dummy = dummy;
exports.main = main;
