/*
 * @作者: 0x2CA
 * @创建时间: 2023-02-09
 * @最后编辑时间: 2023-03-14
 * @最后编辑者: 0x2CA
 * @描述:
 */
import ILRU from "./ILRU"
import ILURItem from "./ILURItem"

export default class LRUCache<Key, Value> implements ILRU<Key, Value> {
    private static DEFAULT_CAPACITY = 8
    private _cache: Key[]
    private _map: Map<Key, Value>
    private _capacity: number
    constructor(capacity: number = LRUCache.DEFAULT_CAPACITY) {
        this._capacity = capacity > 0 ? capacity : LRUCache.DEFAULT_CAPACITY
        this._cache = []
        this._map = new Map()
    }

    public getCapacity() {
        return this._capacity
    }

    public has(key: Key): boolean {
        return this._map.has(key);
    }

    public delete(key: Key): Value {
        if (!this._map.has(key)) {
            return null;
        }
        const index = this._cache.indexOf(key)
        this._cache.splice(index, 1)
        let value = this._map.get(key);
        this._map.delete(key);
        return value;
    }

    public get(key: Key): Value | null {
        if (!this._map.has(key)) {
            return null;
        }
        this.makeRecently(key)
        return this._map.get(key)
    }

    public put(key: Key, value: Value): ILURItem<Key, Value> | null {
        if (this._map.has(key)) {
            this.makeRecently(key)
            // 更新
            this._map.set(key, value)
            return null;
        }

        this.addRecently(key, value)

        // 容量达到上下，删除 least recent used.
        if (this._cache.length >= this._capacity) {
            return this.removeLeastRecently()
        }
    }

    private makeRecently(key: Key): void {
        // 由于再 makeRecently 之前，我们就通过 map.has(key) 判断出 存在性。
        // 所以这里可以不用判断 index === -1
        const index = this._cache.indexOf(key)
        this._cache.splice(index, 1)
        this._cache.push(key)
    }

    private removeLeastRecently(): ILURItem<Key, Value> {
        // 由于只有当 this.cache.length >= this.capacity 才会调用该方法，、
        // 所以所得到的 key 值是存在的
        const key = this._cache.shift()
        let value = this._map.get(key);
        this._map.delete(key);
        return { key, value };
    }

    private addRecently(key: Key, value: Value): void {
        this._cache.push(key)
        this._map.set(key, value)
    }
}