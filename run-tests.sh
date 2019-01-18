#!/bin/bash

set -o pipefail
set -e

# Run a background HTTP server to serve our JavaScript and test against.
./node_modules/.bin/http-server . -p 8000 &

# Run our tests.
./node_modules/.bin/cypress run
