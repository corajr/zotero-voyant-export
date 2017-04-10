"use strict";

exports.getZotero = getZotero;
exports.getZoteroPane = getZoteroPane;

var utils = require("./utils");
var format = require("./format");

var Zotero = utils.getWindow().Zotero;
var logger = new utils.Logger(Zotero);

function getZotero() {
  return Zotero ? Zotero : (Zotero = utils.getWindow().Zotero);
}

function getZoteroPane() {
  var Zotero = getZotero();
  if (!Zotero) return null;
  var ZoteroPane = Zotero.getActiveZoteroPane();
  if (!ZoteroPane) throw new Error("ZoteroPane is undefined!");
  if (!ZoteroPane.loaded) {
    try {
      ZoteroPane.show();
    } catch (e) {
      throw new Error("ZoteroPane could not be shown!");
    }
  }
  return ZoteroPane;
}
