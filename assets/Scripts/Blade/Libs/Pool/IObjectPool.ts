/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-14
 * @最后编辑时间: 2023-03-16
 * @最后编辑者: 0x2CA
 * @描述: 对象池接口
 */
export default interface IObjectPool<T> {

    /**
     * 数量
     */
    size(): void;

    /**
     * 清除
     */
    clear(): void;

    /**
     * 获取
     */
    get(): T;

    /**
     * 释放
     * @param element
     */
    release(element: T);
}