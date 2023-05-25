
import SingletonBase from "../../Bases/SingletonBase";

/*
 * @作者: 0x2CA
 * @创建时间: 2023-02-09
 * @最后编辑时间: 2023-03-15
 * @最后编辑者: 0x2CA
 * @描述:
 */
export default abstract class FactoryBase<T extends FactoryBase<T>> extends SingletonBase<T> {

    protected onInitialize() {
    }

    protected onDispose() {
    }

}