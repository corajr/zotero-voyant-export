# Zotero Voyant Export [UNMAINTAINED]

I no longer personally get a chance to do research very often, and so haven't
been able to keep pace with the many changes to Zotero and the Firefox ecosystem.

If someone wants to do something with the code, you have my full blessing. The
code is under GPL3, aiming to be compatible with Voyant and Zotero's licenses.

<hr>

Export your Zotero collections to Voyant.

[Voyant](http://voyant-tools.org/) is "a web-based text analysis and reading
environment" that lets you visualize the content of a text
corpus. [Zotero](https://www.zotero.org/) is a "a free, easy-to-use tool to help
you collect, organize, cite, and share your research sources." This translator
aims to help those with preexisting Zotero collections get a new view on their
data via Voyant.

## Requirements

* [Zotero Standalone 5.0][zot] or higher; note that **the beta will irreversibly
upgrade your database** (!), so take care to backup beforehand.
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
to [your local Voyant server][local-voyant] -- for collections larger than a
handful of documents, you'll probably want to host locally). You should then be
able to see your corpus in the default Voyant view.

## Development

This is a work-in-progress. Please see the [initial release project][project]
for an indication of what has been/will be done. Help is very welcome!

### Build

Run `make` to create a new XPI.

Signing can be done with `make sign`, if you have the `JWT_ISSUER` and
`JWT_SECRET` environment variables set. The `update.rdf` will be signed with
[uhura](http://www.softlights.net/projects/mxtools/) (make sure you have the
private key file path as `UHURA_PEM_FILE` in your environment).

### Tests

Run the tests using Firefox Nightly, e.g.:

```
jpm test -b /Applications/Nightly.app/
```

[local-voyant]: http://docs.voyant-tools.org/resources/run-your-own/voyant-server/
[zot]: https://forums.zotero.org/discussion/59829/zotero-5.0-beta/
[release]: https://github.com/corajr/zotero-voyant-export/releases
[project]: https://github.com/corajr/zotero-voyant-export/projects/1



## LICENSE

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
