#
# Paths
#

#
# All
#

all: clean install test

#
# Install dependencies
#

install:
	@npm install

#
# Run the tests
#

test:
	npm test -s

#
# Clean
#

clean:
	rm -rf node_modules

#
# Run the tests on the CI server
#

test-ci: test

#
# Instructions
#

.PHONY: test
