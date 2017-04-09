/* global describe, it, expect */
/* global generateMODS */

const item = {
  "title": "Further Chronicles of Avonlea",
  "creators": [{
    "lastName": "Montgomery",
    "firstName": "Lucy Maud"
  }]
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
  it("produces DC from a Zotero item (Zotero key only)");
});
