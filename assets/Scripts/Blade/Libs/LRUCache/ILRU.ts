import ILURItem from "./ILURItem"

export default interface ILRU<Key, Value> {
    get(key: Key): Value | null
    put(key: Key, value: Value): ILURItem<Key, Value> | null
}