#!/bin/bash
cd -- "$(dirname "$BASH_SOURCE")"
function pause (){
    read -p "prese -> continue"
}

node ./addressables/build/Application.js  -i "../assets/resources" -o "../assets/resources/Addressables.json"
pause