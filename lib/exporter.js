var zotero = require('./zotero');
var ui = require('./ui');
var utils = require('./utils');

var Zotero = zotero.getZotero();
var ZoteroPane = zotero.getZoteroPane();
var logger = new utils.Logger(Zotero);

function doExport() {
  var collection = ZoteroPane.getSelectedCollection();
  var name = collection.name;
  var items = collection.getChildItems();

  logger.info("doExport on " + name + "; " + items.length + " items");

  var outDir = ui.showFilePicker(name);
  if (outDir !== null) {
    logger.info("save to " + outDir.path);
  }
  // Zotero.updateZoteroPaneProgressMeter(translation.getProgress());
}

exports.doExport = doExport;
