const {
  Cc,
  Ci
} = require("chrome");
const nsIFilePicker = Ci.nsIFilePicker;
const utils = require('./utils');
const zotero = require('./zotero');

function getCollectionMenu() {
  var zoteroPane = zotero.getZoteroPane();
  return zoteroPane.document.getElementById("zotero-collectionmenu");
}

function insertExportMenuItem(onclick) {
  var menu = getCollectionMenu();
  if (!menu.querySelector('#voyant-export')) {
    var doc = menu.ownerDocument;
    var menuitem = doc.createElement("menuitem");
    menuitem.setAttribute('id', 'voyant-export');
    menuitem.setAttribute('label', "Export Collection to Voyant...");
    menuitem.onclick = onclick;
    menu.appendChild(menuitem);
  }
}

function removeExportMenuItem() {
  var menu = getCollectionMenu();
  var menuitem = menu.querySelector('#voyant-export');
  if (menuitem !== null) {
    menuitem.parentNode.removeChild(menuitem);
  }
}

function showFilePicker(name) {
  var fp = Cc["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
  fp.defaultString = name + ".zip";
  fp.defaultExtension = "zip";
  fp.appendFilter("ZIP", "*.zip");
  fp.init(utils.getWindow(), "Export to Voyant", nsIFilePicker.modeSave);

  var rv = fp.show();
  if (rv != nsIFilePicker.returnOK && rv != nsIFilePicker.returnReplace) {
    return null;
  }
  return fp.file;
}

exports.insertExportMenuItem = insertExportMenuItem;
exports.removeExportMenuItem = removeExportMenuItem;
exports.showFilePicker = showFilePicker;
