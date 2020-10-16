#!/bin/bash -i
while read -e -p '$ ' line
do    echo "your cmd: $line"
      eval "$line"
done
