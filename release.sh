#!/bin/bash

VERSION=invalid

if [ ! -x "$(command -v jq)" ]
then
	VERSION="$(grep -F '"version": "' manifest.json | head -n 1 | awk -F'"' '{ print $4 }')"
else
	VERSION="$(jq .version manifest.json | xargs)"
fi

echo "Releasing version $VERSION"

zip -r -FS GagHob-"$VERSION".zip ./* --exclude '*.git*'

