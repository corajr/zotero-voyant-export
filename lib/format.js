const {
  Cc,
  Ci
} = require("chrome");
const parser = Cc["@mozilla.org/xmlextras/domparser;1"].createInstance(Ci.nsIDOMParser);
const serializer = Cc["@mozilla.org/xmlextras/xmlserializer;1"].createInstance(Ci.nsIDOMSerializer);

const xmlDecl = '<?xml version="1.0" encoding="UTF-8"?>';
const modsNS = "http://www.loc.gov/mods/v3";
const modsEl = '<mods xmlns="http://www.loc.gov/mods/v3" xmlns:mods="http://www.loc.gov/mods/v3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.loc.gov/mods/v3 http://www.loc.gov/standards/mods/mods.xsd" />';

const dcEl = '<oai_dc:dc xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd" />';
const dcNS = 'http://purl.org/dc/elements/1.1/';

// https://github.com/zotero/translators/blob/d47f2ce085b9bbceb0ba70307041f8ccb5bf17e0/MODS.js#L310
function mapProperty(ns, parentElement, elementName, property, attributes) {
  if (!property && property !== 0) return null;
  var doc = parentElement.ownerDocument,
    newElement = doc.createElementNS(ns, elementName);
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
  var title = item.getDisplayTitle();
  if (title) {
    var titleInfo = doc.createElementNS(modsNS, "titleInfo");
    mapProperty(modsNS, titleInfo, "title", title);
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
  mapProperty(modsNS, name, "namePart", fullName);
  mods.appendChild(name);
}

function generateMODS(item) {
  var doc = parser.parseFromString(xmlDecl + modsEl, "text/xml");
  var mods = doc.documentElement;
  addTitleFromItem(doc, mods, item);
  item.getCreators().forEach(function(c) {
    addNameFromCreator(doc, mods, c);
  });

  return serializer.serializeToString(doc);
}

function generateDC(item) {
  var doc = parser.parseFromString(dcEl, "text/xml");
  var dc = doc.documentElement;
  mapProperty(dcNS, dc, "dc:identifier", item.libraryKey);

  return serializer.serializeToString(doc);
}

exports.generateDC = generateDC;
exports.generateMODS = generateMODS;
