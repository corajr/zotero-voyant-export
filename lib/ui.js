var zotero = require('./zotero');

function getCollectionMenu() {
  var zoteroPane = zotero.getZoteroPane();
  return zoteroPane.document.getElementById("zotero-collectionmenu");
}

function insertExportItem(onclick) {
  var menu = getCollectionMenu();
  if (!menu.querySelector('#voyant-export')) {
    var doc = menu.ownerDocument;
    var menuitem = doc.createElement("menuitem");
    menuitem.setAttribute('id', 'voyant-export');
    menuitem.setAttribute('label', "Export Collection to Voyant");
    menuitem.onclick = onclick;
    menu.appendChild(menuitem);
  }
}

function removeExportItem() {
  var menu = getCollectionMenu();
  var menuitem = menu.querySelector('#voyant-export');
  if (menuitem !== null) {
    menuitem.parentNode.removeChild(menuitem);
  }
}

exports.insertExportItem = insertExportItem;
exports.removeExportItem = removeExportItem;
