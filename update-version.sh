#!/bin/bash
# Update version in all HTML and JS files
# Usage: ./update-version.sh [version]

VERSION=${1:-$(date +%s)}
echo "Updating to version: $VERSION"

# Update CSS links in all HTML files
for file in *.html; do
    if [ -f "$file" ]; then
        # Update css/styles.css?v=xxx
        sed -i "s|css/styles\.css\(?v=[^\"]*\)\?\"|css/styles.css?v=$VERSION\"|g" "$file"
        echo "Updated: $file"
    fi
done

# Update BUILD_VERSION in cache-buster.js
sed -i "s|BUILD_VERSION: '[^']*'|BUILD_VERSION: '$VERSION'|g" js/core/cache-buster.js
echo "Updated: js/core/cache-buster.js"

echo "Version update complete!"
