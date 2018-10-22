#!/bin/bash

set -o pipefail
set -e

# Run a background HTTP server to serve our JavaScript and test against.
./node_modules/.bin/simplehttpserver . &
TEST_SERVER_PID=$!

# Run our tests.
./node_modules/.bin/cypress run

# Kill our backgrounded server.
kill $TEST_SERVER_PID
