var self = require("sdk/self");
var utils = require("./lib/utils");
var ui = require("./lib/ui");
var zotero = require("./lib/zotero");

var logger = new utils.Logger(utils.getWindow().Zotero);

function main(options, callbacks) {
  logger.info("zotero-voyant-export loaded.");
  ui.insertExportButton(zotero.doExport);
}

function onUnload(reason) {
  ui.removeExportButton();
}

exports.main = main;
exports.onUnload = onUnload;
