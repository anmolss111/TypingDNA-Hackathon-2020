#!/bin/bash -i
while read -e -p '$ ' line
do
    pythonMessage=$(python3 /Users/anmolsuri/Documents/Develpoment/Hackathons/2020/typingDNA/Shell/typingDna.py "$line")
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
