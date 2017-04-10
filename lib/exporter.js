const {
  Ci,
  Cu
} = require("chrome");
Cu.import("resource://gre/modules/FileUtils.jsm");
var zotero = require('./zotero');
var ui = require('./ui');
var utils = require('./utils');
var format = require('./format');

function itemSaver(logger, outDir, Zotero) {
  return function(item) {
    var itemID = item.id;
    logger.info("Saving item " + itemID);

    var itemOutDir = outDir.clone();
    itemOutDir.append(itemID.toString());
    itemOutDir.create(Ci.nsIFile.DIRECTORY_TYPE, 0755);

    var mods = format.generateMODS(item);
    var dc = format.generateDC(item);

    var modsFile = itemOutDir.clone();
    modsFile.append("MODS.bin");
    var dcFile = itemOutDir.clone();
    dcFile.append("DC.xml");

    Zotero.File.putContents(modsFile, mods);
    Zotero.File.putContents(dcFile, dc);

    var attPromise = item.getBestAttachment();
  };
}

function mkTmpDir() {
  var tmpDir = FileUtils.getFile("TmpD", ["collection"]);
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
    items.forEach(itemSaver(logger, outDir, Zotero));
    // Zotero.File.zipDirectory(outDir.path, outFile.path);
  }
  // Zotero.updateZoteroPaneProgressMeter(translation.getProgress());
}

exports.doExport = doExport;
