#!/bin/bash -i
while read -e -p '$ ' line
do
    pythonMessage=$(python3 /Users/anmolsuri/Library/Containers/com.typingDNA/Data/Documents/typingDna/typingDna.py "$line")
    if [ "$pythonMessage" == "" ]
    then
        eval "$line"
    elif [[ $pythonMessage != Error* ]]
    then
        eval "$pythonMessage"
    else
        echo $pythonMessage
    fi
done
