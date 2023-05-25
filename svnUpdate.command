#!/bin/bash
cd -- "$(dirname "$BASH_SOURCE")"
function pause (){
    read -p "prese -> continue"
}

svn update .
svn update ./assets/resources
svn update ./assets/Scripts/Module/Configs
svn update ./tools/protobuf

pause