@echo off
title js代码混淆   
set jsfile=

cls
echo 提示：请拖放js文件并回车！
set /p jsfile=

move %jsfile% %jsfile%.tmp

java -jar compiler.jar  --js  %jsfile%.tmp --js_output_file %jsfile%

del %jsfile%.tmp

pause