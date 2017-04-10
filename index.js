var self = require("sdk/self");
var utils = require("./lib/utils");
var ui = require("./lib/ui");
var zotero = require("./lib/zotero");
var exporter = require("./lib/exporter");
var {
  setTimeout
} = require("sdk/timers");

var retries = 0;
var maxRetries = 5;

function main(options, callbacks) {
  var Zotero = zotero.getZotero();
  if (!Zotero && retries < maxRetries) {
    // try again with exponential delay
    setTimeout(main, (Math.pow(2, retries) * 1000));
    retries += 1;
    return;
  }

  var logger = new utils.Logger(Zotero);
  logger.info("zotero-voyant-export loaded.");
  ui.insertExportMenuItem(exporter.doExport);
}

function onUnload(reason) {
  ui.removeExportMenuItem();
}

exports.main = main;
exports.onUnload = onUnload;
