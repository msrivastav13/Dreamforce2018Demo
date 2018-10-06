#!/bin/bash

if [ $# -lt 1 ]
then
    echo Usage: retrievePkg.sh packageName
    exit
fi

## Retrieve the PackageXML from Unmanaged Container

sfdx force:mdapi:retrieve -s -r ./mdapipkg -u $1 -p "$2"
unzip -o -q ./mdapipkg/unpackaged.zip -d ./mdapipkg
cp -a ./mdapipkg/package.xml ./manifest/


