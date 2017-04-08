# zotero-voyant-export
Export a Zotero collection for analysis with Voyant.

[Voyant](http://voyant-tools.org/) is "a web-based text analysis and reading
environment" that lets you visualize the content of a text
corpus. [Zotero](https://www.zotero.org/) is a "a free, easy-to-use tool to help
you collect, organize, cite, and share your research sources." This translator
aims to help those with preexisting Zotero collections get a new view on their
data via Voyant.

NB: This translator is only of use if your Zotero items have full-text content
(in the form of PDFs, HTML snapshots, or plain text) attached. Also, only
Voyant-supported metadata will be exported: at present, this means title,
author, and date.

## Installation

Locate your Zotero data directory (gear icon -> "Preferences..." -> "Advanced"
tab -> "Files and Folders" -> "Show Data Directory" button). Copy the
`Voyant.js` file into the `translators` directory, inside the data directory.

## Usage

Right-click on the collection/library you wish to analyze. Select "Export
Collection..." (or "Export Library...") and in the "Format:" drop-down menu,
select "Voyant."

Upload the resulting zip file to [voyant-tools.org](voyant-tools.org) (or
to [your local Voyant server][local-voyant]. You should be able to see your
corpus in the default Voyant view.

## Status

This is a work-in-progress. Please see the [initial release project][project]
for an indication of what has been/will be done.

## License

This work is under the [GNU Affero General Public License v3.0][agpl] for
compatibility with Zotero.

[local-voyant]: http://docs.voyant-tools.org/resources/run-your-own/voyant-server/
[project]: https://github.com/corajr/zotero-voyant-export/projects/1
[agpl]: https://www.gnu.org/licenses/agpl-3.0.en.html
