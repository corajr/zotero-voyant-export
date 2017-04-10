var self = require("sdk/self");
var utils = require("./lib/utils");
var ui = require("./lib/ui");
var zotero = require("./lib/zotero");
var exporter = require("./lib/exporter");

var logger = new utils.Logger(zotero.getZotero());

function main(options, callbacks) {
  logger.info("zotero-voyant-export loaded.");
  ui.insertExportMenuItem(exporter.doExport);
}

function onUnload(reason) {
  ui.removeExportMenuItem();
}

exports.main = main;
exports.onUnload = onUnload;
