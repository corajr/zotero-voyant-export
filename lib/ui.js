var zotero = require('./zotero');

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

exports.insertExportMenuItem = insertExportMenuItem;
exports.removeExportMenuItem = removeExportMenuItem;
