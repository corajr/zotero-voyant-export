# Zotero Voyant Export

Export your Zotero collections to Voyant.

[Voyant](http://voyant-tools.org/) is "a web-based text analysis and reading
environment" that lets you visualize the content of a text
corpus. [Zotero](https://www.zotero.org/) is a "a free, easy-to-use tool to help
you collect, organize, cite, and share your research sources." This translator
aims to help those with preexisting Zotero collections get a new view on their
data via Voyant.

## Requirements

* [Zotero Standalone 5.0][zot] or higher; note that **the beta will irreversibly
upgrade your database**, so take care to backup beforehand.
* a collection containing full texts (as PDFs, HTML snapshots, etc.)

## Installation

Download the latest [release][release] of the XPI (click "Save Link As..." if in
Firefox). Then open Zotero Standalone and select the Tools menu -> Add-ons.
Click the gear icon in the upper right and select "Install Add-On From File...";
open the XPI file you just saved.

## Usage

Right-click on the collection you wish to analyze. Select "Export Collection to
Voyant..." and choose a save location for the corpus as a zip file.

Upload the resulting zip to [voyant-tools.org](voyant-tools.org) (or
to [your local Voyant server][local-voyant]. You should be able to see your
corpus in the default Voyant view.

## Development

This is a work-in-progress. Please see the [initial release project][project]
for an indication of what has been/will be done. Help is very welcome!

### Build

Run `make` to create a new XPI.

### Tests

Run the tests using Firefox Nightly, e.g.:

```
jpm test -b /Applications/Nightly.app/
```

[local-voyant]: http://docs.voyant-tools.org/resources/run-your-own/voyant-server/
[zot]: https://forums.zotero.org/discussion/59829/zotero-5.0-beta/
[release]: https://github.com/corajr/zotero-voyant-export/releases
[project]: https://github.com/corajr/zotero-voyant-export/projects/1
