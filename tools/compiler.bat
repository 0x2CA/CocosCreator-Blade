@echo off
title js�������   
set jsfile=

cls
echo ��ʾ�����Ϸ�js�ļ����س���
set /p jsfile=

move %jsfile% %jsfile%.tmp

java -jar compiler.jar  --js  %jsfile%.tmp --js_output_file %jsfile%

del %jsfile%.tmp

pause