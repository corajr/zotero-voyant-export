.PHONY: all xpi test check-env check-jwt-issuer check-jwt-secret

SOURCES := $(wildcard *.js) $(wildcard lib/*.js)
INSTALL_RDF_PATCH := $(abspath install.rdf.patch)
UNSIGNED_XPI := zotero-voyant-export.xpi

all: xpi

xpi: $(UNSIGNED_XPI)

$(UNSIGNED_XPI): $(SOURCES) $(INSTALL_RDF_PATCH)
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

sign: $(UNSIGNED_XPI) check-env
	jpm sign --api-key $(JWT_ISSUER) --api-secret $(JWT_SECRET) --xpi $<
