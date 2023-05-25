/*
 * @作者: 0x2CA
 * @创建时间: 2023-02-09
 * @最后编辑时间: 2023-04-10
 * @最后编辑者: 0x2CA
 * @描述:
 */

package com.external.jsapi;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;

public class Blade {

    public static void copyToClipBoard(final String str) {
        ((Cocos2dxActivity) Cocos2dxActivity.getContext()).runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ClipboardManager cm = (ClipboardManager) ((Cocos2dxActivity) Cocos2dxActivity.getContext()).getSystemService(Context.CLIPBOARD_SERVICE);
                ClipData clip = ClipData.newPlainText("Message", str);
                cm.setPrimaryClip(clip);
            }
        });
    }

    public static void callCocos(String funName, String... args) {
        ((Cocos2dxActivity) Cocos2dxActivity.getContext()).runOnGLThread(new Runnable() {
            @Override
            public void run() {
                String scriptStr = "";
                StringBuilder argsStr = null;

                for (int index = 0; index < args.length; index++) {
                    String arg = args[index];
                    if (argsStr == null) {
                        argsStr = new StringBuilder(String.format("\"%s\"", arg));
                    } else {
                        argsStr.append(String.format(", \"%s\"", arg));
                    }
                }

                if (argsStr == null) {
                    argsStr = new StringBuilder("");
                }

                scriptStr = String.format("blade.platform.get().%s(%s);", funName, argsStr.toString());

                Cocos2dxJavascriptJavaBridge.evalString(scriptStr);
            }
        });
    }

}
