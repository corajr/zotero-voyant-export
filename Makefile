.PHONY: all release xpi test sign sign-update check-env check-jwt-issuer check-jwt-secret

SOURCES := $(wildcard *.js) $(wildcard lib/*.js)
INSTALL_RDF_PATCH := $(abspath install.rdf.patch)
UNSIGNED_XPI := zotero-voyant-export.xpi
UHURA := uhura

VERSION := $(shell cat VERSION)
SIGNED_FILE := zotero_voyant_export-$(VERSION)-fx.xpi
UPDATE_RDF := update.rdf
UPDATELINK := "https://github.com/corajr/zotero-voyant-export/releases/download/v$(VERSION)/$(SIGNED_FILE)"

all: xpi

xpi: $(UNSIGNED_XPI)

release: $(UPDATE_RDF)

package.json: package.json.template VERSION
	sed s/VERSION/$(VERSION)/g < $< | sed sXUPDATELINKX$(UPDATELINK)X > $@

$(UNSIGNED_XPI): package.json $(SOURCES) $(INSTALL_RDF_PATCH)
	rm -f $@
	jpm xpi --dest-dir /tmp
	rm -rf /tmp/zotero-voyant-export
	mkdir -p /tmp/zotero-voyant-export
	(cd /tmp/zotero-voyant-export && unzip /tmp/zotero-voyant-export.xpi && \
	 patch install.rdf $(INSTALL_RDF_PATCH))
	(cd /tmp/zotero-voyant-export && zip -r $(abspath $@) .)

test:
	jpm test -b "/Applications/Nightly.app"

check-env: check-jwt-issuer check-jwt-secret

check-jwt-issuer:
ifndef JWT_ISSUER
	$(error JWT_ISSUER is undefined)
endif

check-jwt-secret:
ifndef JWT_SECRET
	$(error JWT_SECRET is undefined)
endif

sign: $(SIGNED_FILE)

$(SIGNED_FILE): $(UNSIGNED_XPI) check-env
	jpm sign --api-key $(JWT_ISSUER) --api-secret $(JWT_SECRET) --xpi $<

$(UPDATE_RDF): $(SIGNED_FILE)
	$(UHURA) -k $(UHURA_PEM_FILE) $(SIGNED_FILE) $(UPDATELINK) > $@
