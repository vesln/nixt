REPORTER ?= dot

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--ui bdd \
		test/*.test.js

clean:
	rm -fr lib-cov
	rm -f coverage.html

test-cov: lib-cov
	@NIXT_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	@rm -fr ./$@
	@jscoverage lib $@

.PHONY: test-cov test
