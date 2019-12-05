/**
 * 字符串助手
 */
class StringHelper {
    
    /**
    * 判断是否以指定字符串开头
    * @param s 
    * @param part 
    */
    public static startsWith(s: string, part: string): boolean {
        return s.slice(0, part.length) == part;
    }

    /**
     * 判断是否以指定字符串结尾
     * @param s 
     * @param part 
     */
    public static endsWith(s: string, part: string): boolean {
        return s.slice(part.length) == part;
    }

    /**
     * 比较版本号
     * @param ver1 
     * @param ver2 
     */
    public static compareVersion(ver1: string, ver2: string) {
        const v1 = ver1.split('.');
        const v2 = ver2.split('.');

        const len = Math.min(v1.length, v2.length);
        for (var i = 0; i < len; ++i) {
            var num1 = parseInt(v1[i]) || 0;
            var num2 = parseInt(v2[i]) || 0;
            if (num1 > num2) {
                return 1;
            }
            else if (num1 < num2) {
                return -1;
            }
        }

        if (v1.length > v2.length) {
            return 1;
        }
        else if (v1.length < v2.length) {
            return -1;
        }

        return 0;
    }
}





export default StringHelper;