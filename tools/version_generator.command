#!/bin/bash
cd -- "$(dirname "$BASH_SOURCE")"
function pause (){
    read -p "prese -> continue"
}

version="1.0.0"
jsb="jsb-default"
platform="Android"
urlRoot="https://sk1cdn.ios.gzyouai.com/Native/Official/$platform/remote-assets"
assetRoot="../build/$jsb"
manifestRoot="../assets/resources/HotUpdate"
remoteRoot="../remote-assets"

if [ ! -e $manifestRoot ]; then
    mkdir -p $manifestRoot
fi

node version_generator.js -v $version -u $urlRoot -s $assetRoot -d $manifestRoot

if [ -e $remoteRoot ]; then
    rm -rf $remoteRoot
    mkdir -p $remoteRoot
else
    mkdir -p $remoteRoot
fi

cp -R "$assetRoot/assets" "$remoteRoot"
cp "$manifestRoot/project.manifest" "$remoteRoot"
cp "$manifestRoot/version.manifest" "$remoteRoot"

cp "$manifestRoot/project.manifest" "$manifestRoot/$platform.manifest"

rm -rf "$manifestRoot/project.manifest"
rm -rf "$manifestRoot/version.manifest"

pause