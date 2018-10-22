#!/bin/bash

set -o pipefail
set -e

# Catch a SIGINT or SIGTERM and trigger a script EXIT (e.g. to catch ctrl+c)
trap "exit" SIGINT SIGTERM
# Kill this process and all of its childen when this script exits.
trap "kill 0" EXIT

# Run a background HTTP server to serve our JavaScript and test against.
./node_modules/.bin/simplehttpserver . &

# Run our tests.
./node_modules/.bin/cypress run
TESTS_EXIT_CODE=$?

exit $TESTS_EXIT_CODE
