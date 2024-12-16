#!/bin/bash

# Find and delete all 'dist' directories
find . -type d -name "dist" -exec rm -rf {} +

# Find and delete all 'node_modules' directories
find . -type d -name "node_modules" -exec rm -rf {} +

echo "All 'dist' and 'node_modules' directories have been deleted."
