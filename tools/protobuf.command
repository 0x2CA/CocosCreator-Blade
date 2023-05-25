#!/bin/bash
cd -- "$(dirname "$BASH_SOURCE")"
function pause (){
    read -p "prese -> continue"
}

cd ./protobuf

node ../protobufjs/node_modules/protobufjs/bin/pbjs -t static-module -w commonjs -o ../../assets/Scripts/Module/Protobuf/protobuf.js **/*.proto

node ../protobufjs/node_modules/protobufjs/bin/pbts -o ../../assets/Scripts/Module/Protobuf/protobuf.d.ts ../../assets/Scripts/Module/Protobuf/protobuf.js

sed -i  '' 's/var $protobuf = /var $protobuf = protobuf; \/\//g' ../../assets/Scripts/Module/Protobuf/protobuf.js

pause