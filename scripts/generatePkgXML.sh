#!/bin/bash

if [ $# -lt 1 ]
then
    echo Usage: generatepkgXML.sh orgalias packageName
    exit
fi

## Retrieve the PackageXML from Unmanaged Container

sfdx force:mdapi:retrieve -s -r ./mdapipkg -u $1 -p "$2" # Retrieve Metadata API Source from Package Name

unzip -o -qq ./mdapipkg/unpackaged.zip -d ./mdapipkg # Unzip the file

rm -rf ./manifest/ # If manifest directory exists delete it

mkdir ./manifest/ # Create a New Manifest Directory

cp -a ./mdapipkg/package.xml ./manifest/ # Copy package.XML to manifest directory

rm -rf ./mdapipkg # Delete the mdapipkg source


