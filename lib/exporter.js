const {
  Ci,
  Cu
} = require("chrome");
Cu.import("resource://gre/modules/FileUtils.jsm");
var zotero = require('./zotero');
var ui = require('./ui');
var utils = require('./utils');
var format = require('./format');
const {
  all,
  resolve
} = require('sdk/core/promise');

function mkdir(startDir, dirName) {
  var newDir = startDir.clone();
  newDir.append(dirName);
  newDir.create(Ci.nsIFile.DIRECTORY_TYPE, 0755);
  return newDir;
}

function fileInDir(startDir, fileName) {
  var newFile = startDir.clone();
  newFile.append(fileName);
  return newFile;
}

function mkTmpDir() {
  var tmpDir = FileUtils.getFile("TmpD", ["collection"]);
  tmpDir.createUnique(Ci.nsIFile.DIRECTORY_TYPE, 0755);
  return tmpDir;
}

function itemSaver(logger, dataDir, Zotero) {
  return function(item) {
    return item.getBestAttachment().then(function(att) {
      return att ? att.getFilePathAsync() : resolve(null);
    }).then(function(attPath) {
      if (attPath) {
        var attFile = Zotero.File.pathToFile(attPath);
        var itemID = item.id;
        logger.info("doExport: saving item " + itemID);

        var itemOutDir = mkdir(dataDir, itemID.toString());

        var mods = format.generateMODS(item);
        var dc = format.generateDC(item);

        var modsFile = fileInDir(itemOutDir, "MODS.bin");
        var dcFile = fileInDir(itemOutDir, "DC.xml");

        Zotero.File.putContents(modsFile, mods);
        Zotero.File.putContents(dcFile, dc);

        attFile.copyTo(itemOutDir, "CWRC.bin");
      }
    });
  };
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

    var bagitFile = fileInDir(outDir, "bagit.txt");
    Zotero.File.putContents(bagitFile, "");

    var dataDir = mkdir(outDir, "data");
    all(items.map(itemSaver(logger, dataDir, Zotero))).then(function(_) {
      return Zotero.File.zipDirectory(outDir.path, outFile.path);
    });
  }
  // Zotero.updateZoteroPaneProgressMeter(translation.getProgress());
}

exports.doExport = doExport;
