function generateMODS(item) {
  return "";
}

function generateDC(item) {
  return "";
}

function doExport() {
  while (item = Zotero.nextItem()) {
    Zotero.debug(item);
  }
}

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = {
    "generateMODS": generateMODS,
    "generateDC": generateDC
  };
}
