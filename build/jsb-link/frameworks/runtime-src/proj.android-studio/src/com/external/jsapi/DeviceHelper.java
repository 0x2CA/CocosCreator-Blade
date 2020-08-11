package com.external.jsapi;

import java.util.Locale;

public class DeviceHelper {
    /**
     * 获取系统语言
     * @return
     */
    public static String getLocale() {
        return Locale.getDefault().toString();
    }
}
