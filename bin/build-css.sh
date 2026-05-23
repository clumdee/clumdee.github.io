#!/usr/bin/env bash
# Build Tailwind CSS from tailwind.input.css → static/css/main.css.
# Run this before pushing whenever you change tailwind.input.css, the
# config, or any template that uses new utility classes.
set -euo pipefail
cd "$(dirname "$0")/.."
./bin/tailwindcss \
  -c tailwind.config.js \
  -i static/css/tailwind.input.css \
  -o static/css/main.css \
  --minify "$@"
