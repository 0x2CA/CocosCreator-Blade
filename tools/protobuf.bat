cd ./protobuf

node ../protobufjs/node_modules/protobufjs/bin/pbjs -t static-module -w commonjs -o ../../assets/Scripts/Module/Protobuf/protobuf.js **/*.proto

node ../protobufjs/node_modules/protobufjs/bin/pbts -o ../../assets/Scripts/Module/Protobuf/protobuf.d.ts ../../assets/Scripts/Module/Protobuf/protobuf.js

powershell -Command "(gc ../../assets/Scripts/Module/Protobuf/protobuf.js) -replace 'var \$protobuf = ', 'var $protobuf = protobuf; //' | Out-File ../../assets/Scripts/Module/Protobuf/protobuf.js -Encoding UTF8"

pause