const {
  Ci
} = require("chrome");
var zotero = require('./zotero');
var ui = require('./ui');
var utils = require('./utils');
var format = require('./format');

function itemSaver(logger, outDir) {
  return function(item) {
    logger.info(item);
    var mods = format.generateMODS(item);
    var dc = format.generateDC(item);
    logger.info(mods);
    logger.info(dc);
    var attPromise = item.getBestAttachment();
  };
}

function mkTmpDir() {
  var tmpDir = Zotero.getTempDirectory();
  tmpDir.createUnique(Ci.nsIFile.DIRECTORY_TYPE, 0755);
  return tmpDir;
}

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
    var outDir = mkTmpDir();
    logger.info("doExport: tmp dir is " + outDir.path);
    items.forEach(itemSaver(logger, outDir));
    // Zotero.File.zipDirectory(outDir.path, outFile.path);
  }
  // Zotero.updateZoteroPaneProgressMeter(translation.getProgress());
}

exports.doExport = doExport;
