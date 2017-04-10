"use strict";

const {
  Cu
} = require("chrome");
Cu.import("resource://gre/modules/Services.jsm");

var wm = Services.wm;

exports.getWindow = getWindow;
exports.Logger = Logger;

function Logger(Zotero) {
  this.Zotero = Zotero;
}

Logger.prototype = {
  info: function(msg) {
    console.log(msg);
    if (this.Zotero) this.Zotero.debug(msg);
  },
  error: function(msg) {
    console.error(msg);
    if (this.Zotero) this.Zotero.debug(msg);
  }
};

function getWindow() {
  return wm.getMostRecentWindow(null);
}
