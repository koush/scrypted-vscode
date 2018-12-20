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

if [ "$extension" != "js" ]
then
    echo "script must be javascript and have a js extension"
    echo "found: $extension"
    exit 4
fi

strippedFilename=$(basename $filename)

DEBUG_URL="https://$1:9443/component/script/debug?scriptId=$2&filename=$strippedFilename"
echo "deploying to $DEBUG_URL"

curl -k --data-binary @$filename -H "Content-Type: text/plain" $DEBUG_URL