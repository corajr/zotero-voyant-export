var format = require('../lib/format');

const attachment = {
  "saveFile": function() {
    return null;
  }
};

const item = {
  "title": "Further Chronicles of Avonlea",
  "libraryKey": "XYZ",
  "creators": [{
    "lastName": "Montgomery",
    "firstName": "Lucy Maud"
  }],
  "attachments": [attachment]
};

exports["test generateMODS produces MODS from a Zotero item (title and author only)"] = function(assert) {
  var mods = format.generateMODS(item);
  console.log(mods);
  assert.ok(mods === ('<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<mods xmlns="http://www.loc.gov/mods/v3" xmlns:mods="http://www.loc.gov/mods/v3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.loc.gov/mods/v3 http://www.loc.gov/standards/mods/mods.xsd">' +
    '<titleInfo>' +
    '<title>Further Chronicles of Avonlea</title>' +
    '</titleInfo>' +
    '<name type="personal">' +
    '<namePart>Lucy Maud Montgomery</namePart>' +
    '</name>' +
    '</mods>'), "MODS output ok");
};

exports["test generateDC produces DC from a Zotero item (Zotero key only)"] = function(assert) {
  var dc = format.generateDC(item);
  assert.ok(dc === ('<oai_dc:dc xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd">' +
    '<dc:identifier>XYZ</dc:identifier>' +
    '</oai_dc:dc>'), "DC output ok");
};

require("sdk/test").run(exports);
