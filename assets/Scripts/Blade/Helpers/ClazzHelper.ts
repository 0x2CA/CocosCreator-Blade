
/*
 * @作者: 0x2CA
 * @创建时间: 2022-10-27
 * @最后编辑时间: 2023-03-15
 * @最后编辑者: 0x2CA
 * @描述: 类助手
 */
export default class ClazzHelper {

    public static async getClazz(clazzName: string) {
        let clazz = (await import(clazzName) as any).default;
        return clazz
    }
}