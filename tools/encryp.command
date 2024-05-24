#!/bin/bash
cd -- "$(dirname "$BASH_SOURCE")"
function pause (){
    read -p "prese -> continue"
}

# 函数：转义sed命令中的特殊字符
function escape_sed_chars() {
    local str="$1"
    local escaped_str
    escaped_str=$(echo "$str" | sed 's/[\/&]/\\&/g')
    echo "$escaped_str"
}

encrySign="This is a encry file!!"
encryKey="jbNFX&NWAe56Ftqms8H9D23@vFR#cU9K"
target="jsb-default"

echo "标记:${encrySign}"
echo "密码:${encryKey}"
echo "目标:${target}"

if [ "$target" = "jsb-default" ]; then
escaped_encrySign=$(escape_sed_chars "${encrySign}")
escaped_encryKey=$(escape_sed_chars "${encryKey}")
 cat ./encryptAsset/CCFileUtils.cpp |  sed "s/{{encrySign}}/${escaped_encrySign}/g" | sed "s/{{encryKey}}/${escaped_encryKey}/g" > ../build/jsb-default/frameworks/cocos2d-x/cocos/platform/CCFileUtils.cpp
fi

node ./encryptAsset/Build/Application.js -i "../build/${target}/assets" -s "${encrySign}" -k "${encryKey}"

pause