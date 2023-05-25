/**
 * 对象助手
 */
export default class ObjectHelper {

    /**
     * 浅拷贝
     * @param object
     * @returns
     */
    public static copyShallow<T extends Object>(object: T): T {
        if (object == null) {
            return null;
        }
        if (typeof(object) != "object") {
            return object;
        }
        return { ...object };
    }

    /**
     * 深拷贝
     * @param object
     */
    public static copyDeep<T extends Object>(object: T): T {
        if (object == null) {
            return null;
        }
        return JSON.parse(JSON.stringify(object));
    }
}
