var zotero = require('./zotero');
var ui = require('./ui');
var utils = require('./utils');
var format = require('./format');

function doExport() {
  var Zotero = zotero.getZotero();
  var ZoteroPane = zotero.getZoteroPane();
  var logger = new utils.Logger(Zotero);

  var collection = ZoteroPane.getSelectedCollection();
  var name = collection.name;
  var items = collection.getChildItems();

  logger.info("doExport: collection " + name + ", " + items.length + " items");

  var outFile = ui.showFilePicker(name);
  if (outFile !== null) {
    logger.info("doExport: saving to " + outFile.path);
    items.forEach(function(item) {
      logger.info(item);
      var mods = format.generateMODS(item);
      var dc = format.generateDC(item);
      logger.info(mods);
      logger.info(dc);
      var attPromise = item.getBestAttachment();
    });
  }
  // Zotero.updateZoteroPaneProgressMeter(translation.getProgress());
}

exports.doExport = doExport;
