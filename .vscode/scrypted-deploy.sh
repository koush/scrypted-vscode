#!/bin/bash

if [ -z "$1" ]
then
    echo "scrypted.debugHost not defined in workspace settings"
    exit 1
fi

if [ -z "$2" ]
then
    echo "scrypted.debugScriptId not defined in workspace settings"
    exit 2
fi

if [ -z "$3" ]
then
    echo "no deploy script provided"
    exit 3
fi

filename=$3
extension="${filename##*.}"

if [ -z "$4" ]
then
    echo "outDir paramter missing. Please ensure it is provided in an argument in tasks.json and has a matching value in launch.json."
    exit 4
fi
outdir=$4

# all files must be transpiled since duktape is ecmascript 5. find the transpiled file.
filenameNoExtension=$(basename "${filename%.*}")
javascriptFilename="$outdir/$filenameNoExtension.js"
if [ ! -f "$javascriptFilename" ]
then
    echo "Transpiled TypeScript file not found: $javascriptFilename"
    exit 41
fi
echo $javascriptFilename
filename=$javascriptFilename

strippedFilename=$(basename $filename)

DEBUG_URL="https://$1:9443/component/script/debug?scriptId=$2&filename=$strippedFilename&engine=duktape"
echo "deploying to $DEBUG_URL"

# dump the contents to stderr for debugging, but observe the status code in stdout
HTTP_STATUS=$(curl  -w '%{http_code}' -o /dev/stderr -s -k --data-binary @$filename -H "Content-Type: text/plain" $DEBUG_URL)
if [ "$HTTP_STATUS" != "200" ]
then
    exit 101
fi
exit 0


