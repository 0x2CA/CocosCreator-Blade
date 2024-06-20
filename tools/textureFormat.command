#!/bin/bash
cd -- "$(dirname "$BASH_SOURCE")"
function pause (){
    read -p "prese -> continue"
}

node ./textureFormat/build/Application.js  -i "../assets"
pause