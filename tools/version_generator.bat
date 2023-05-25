
set version=1.0.0
set jsb=jsb-link
set platform=Android
set urlRoot=http://192.168.55.13:5502/remote-assets/
set assetRoot=../build/%jsb%
set manifestRoot=../assets/resources/HotUpdate/%platform%
set remoteRoot=../remote-assets

if exist %manifestRoot% ( rd /s /q "%manifestRoot%" )

node version_generator.js -v %version% -u %urlRoot% -s %assetRoot% -d %manifestRoot%

if exist %remoteRoot% ( rd /s /q "%remoteRoot%" )

xcopy "%assetRoot%/assets" "%remoteRoot%" /F /Y /E /I
xcopy "%manifestRoot%/project.manifest" "%remoteRoot%" /F /Y /I
xcopy "%manifestRoot%/version.manifest" "%remoteRoot%" /F /Y /I
