.PHONY: all xpi test

SOURCES := $(wildcard *.js) $(wildcard lib/*.js)
INSTALL_RDF_PATCH := $(abspath install.rdf.patch)

all: xpi

xpi: zotero-voyant-export.xpi

zotero-voyant-export.xpi: $(SOURCES) $(INSTALL_RDF_PATCH)
	rm -f $@
	jpm xpi --dest-dir /tmp
	rm -rf /tmp/zotero-voyant-export
	mkdir -p /tmp/zotero-voyant-export
	(cd /tmp/zotero-voyant-export && unzip /tmp/zotero-voyant-export.xpi && \
	 patch install.rdf $(INSTALL_RDF_PATCH))
	(cd /tmp/zotero-voyant-export && zip -r $(abspath $@) .)

test:
	jpm test -b "/Applications/Nightly.app"
