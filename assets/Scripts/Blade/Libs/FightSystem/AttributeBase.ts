/**
 * 属性类
 */
export default abstract class AttributeBase<T = any> {

    // 属性值
    protected _attrs: Map<T, number> = new Map<T, number>();

    public get(id: T, defaultValue: number = 0): number {
        let value = this._attrs.get(id);
        if (value == null) {
            return defaultValue;
        }
        return value;
    }

    public set(id: T, value: number): void {
        this._attrs.set(id, value);
    }
}