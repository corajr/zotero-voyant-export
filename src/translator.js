/* global Zotero */
const xmlDecl = '<?xml version="1.0" encoding="UTF-8"?>';
const modsNS = "http://www.loc.gov/mods/v3";
const modsEl = '<mods xmlns="http://www.loc.gov/mods/v3" xmlns:mods="http://www.loc.gov/mods/v3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.loc.gov/mods/v3 http://www.loc.gov/standards/mods/mods.xsd" />';

// https://github.com/zotero/translators/blob/d47f2ce085b9bbceb0ba70307041f8ccb5bf17e0/MODS.js#L310
function mapProperty(parentElement, elementName, property, attributes) {
  if (!property && property !== 0) return null;
  var doc = parentElement.ownerDocument,
    newElement = doc.createElementNS(modsNS, elementName);
  if (attributes) {
    for (var i in attributes) {
      newElement.setAttribute(i, attributes[i]);
    }
  }
  newElement.appendChild(doc.createTextNode(property));
  parentElement.appendChild(newElement);
  return newElement;
}

function addTitleFromItem(doc, mods, item) {
  if (item.title) {
    var titleInfo = doc.createElementNS(modsNS, "titleInfo");
    mapProperty(titleInfo, "title", item.title);
    mods.appendChild(titleInfo);
  }
}

function addNameFromCreator(doc, mods, creator) {
  var fullName = creator.lastName;
  if (creator.firstName) {
    fullName = creator.firstName + " " + fullName;
  }
  var name = doc.createElementNS(modsNS, "name");
  name.setAttribute("type", "personal");
  mapProperty(name, "namePart", fullName);
  mods.appendChild(name);
}

function generateMODS(item) {
  var doc = (new DOMParser()).parseFromString(xmlDecl + modsEl, "text/xml");
  var mods = doc.documentElement;
  addTitleFromItem(doc, mods, item);
  item.creators.forEach(function(c) {
    addNameFromCreator(doc, mods, c);
  });

  var serializer = new XMLSerializer();
  return serializer.serializeToString(doc);
}

function generateDC(item) {
  return "";
}

function doExport() {
  var item;
  while ((item = Zotero.nextItem()) !== null) {
    Zotero.debug(item);
  }
}

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = {
    "generateMODS": generateMODS,
    "generateDC": generateDC,
    "doExport": doExport
  };
}
