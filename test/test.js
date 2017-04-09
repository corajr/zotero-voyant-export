/* global describe, it, expect */
/* global generateMODS, generateDC */

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

describe("generateMODS", function() {
  it("produces MODS from a Zotero item (title and author only)", function() {
    var mods = generateMODS(item);
    expect(mods).to.be('<?xml version="1.0" encoding="UTF-8"?>' +
      '<mods xmlns="http://www.loc.gov/mods/v3" xmlns:mods="http://www.loc.gov/mods/v3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.loc.gov/mods/v3 http://www.loc.gov/standards/mods/mods.xsd">' +
      '<titleInfo>' +
      '<title>Further Chronicles of Avonlea</title>' +
      '</titleInfo>' +
      '<name type="personal">' +
      '<namePart>Lucy Maud Montgomery</namePart>' +
      '</name>' +
      '</mods>');
  });
});

describe("generateDC", function() {
  it("produces DC from a Zotero item (Zotero key only)", function() {
    var dc = generateDC(item);
    expect(dc).to.be('<oai_dc:dc xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd">' +
      '<dc:identifier>XYZ</dc:identifier>' +
      '</oai_dc:dc>');
  });
});
