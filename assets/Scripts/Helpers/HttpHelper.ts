import PlatformService from "../Services/PlatformService";

/**
 * Http助手
 */
class HttpHelper {

    /**
 * 发送一个HTTP请求
 * @param {*} url
 * @param {*} options
 * {
 *      method?: 'GET' | 'POST' | 'DELETE' | 'PUT'; 请求方法
 *      data?: any; 请求内容
 *      contentType?: 'TEXT' | 'JSON'; 请求参数格式
 *      dataType?: 'TEXT' | 'JSON'; 返回的数据格式
 *      headers?: { [key: string]: any }; 头部
 * }
 */
    public static Request(
        url: string,
        options?: {
            method?: HttpHelper.RequestMethod;
            contentType?: "TEXT" | "JSON";
            dataType?: "TEXT" | "JSON";
            data?: string | Object;
            headers?: Object;
        }
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            options = options || {};

            // 默认值设置
            options.method = options.method || "GET";
            options.contentType = options.contentType || "JSON";
            options.dataType = options.dataType || "JSON";
            if (typeof options.headers !== "object") {
                options.headers = null;
            }

            if (app.platform.getType() == PlatformService.PlatformType.WX) {
                if (options.contentType != "JSON") {
                    options.headers = options.headers || {};
                    options.headers["Content-Type"] =
                        "application/x-www-form-urlencoded; charset=utf-8";
                }

                wx.request({
                    url: url,
                    method: options.method,
                    data: options.data,
                    header: options.headers || {},
                    // responseType: 'text',
                    dataType: options.dataType.toLowerCase(),
                    success: (res) => {
                        if (res.statusCode == 200) {
                            return resolve(res.data);
                        } else {
                            return reject({
                                status: res.statusCode,
                                errMsg: res.errMsg,
                            });
                        }
                    },
                    fail: (err) => {
                        return reject(err);
                    },
                });
            } else {
                var xhr = cc.loader.getXMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status >= 200 && xhr.status < 400) {
                            var response = xhr.responseText;
                            if (options.dataType == "TEXT") {
                                return resolve(response);
                            } else {
                                var dataObj;
                                try {
                                    dataObj = JSON.parse(response);
                                } catch (e) { }
                                return resolve(dataObj);
                            }
                        } else {
                            return reject(xhr.status);
                        }
                    }
                };

                var body = null;
                var headers = options.headers || {};
                if (options.data) {
                    if (options.method === "GET") {
                        headers["Content-Type"] =
                            "application/x-www-form-urlencoded; charset=utf-8";
                        url += HttpHelper.formatParams(options.data, true);
                    } else if (options.method === "POST") {
                        if (options.contentType === "JSON") {
                            headers["Content-Type"] = "application/json; charset=utf-8";
                            body = JSON.stringify(options.data);
                        } else {
                            headers["Content-Type"] =
                                "application/x-www-form-urlencoded; charset=utf-8";
                            body = HttpHelper.formatParams2FromData(options.data);
                        }
                    }
                }

                xhr.open(options.method, url, true);
                
                // 设置header
                for (const key in headers) {
                    if (typeof headers[key] == "string") {
                        xhr.setRequestHeader(key, headers[key]);
                    }
                }

                xhr.send(body);
            }
        });
    }

    /**
    * 格式化为地址栏参数
    * @param params 
    * @param withQuest 是否包含问号
    */
    public static formatParams(params: {}, withQuest: boolean = false) {
        const keys = Object.keys(params);
        return keys.length > 0 ? (withQuest ? '?' : '') + Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&') : '';
    }

    /**
     * 格式化键值对为FormData
     * @param params 
     */
    public static formatParams2FromData(params: {}): FormData {
        const formData = new FormData();
        for (const k in params) {
            formData.append(k, params[k]);
        }
        return formData;
    }

}

namespace HttpHelper {
    export type RequestMethod = "GET" | "POST" | "DELETE" | "PUT";
}


export default HttpHelper;