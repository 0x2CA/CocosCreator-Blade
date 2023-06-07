import Stack from "../Structs/Stack";
import IObjectPool from "./IObjectPool";

/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-14
 * @最后编辑时间: 2023-06-07
 * @最后编辑者: 0x2CA
 * @描述: 对象池
 */
export default class ObjectPool<T> implements IObjectPool<T> {

    protected readonly _createFun: () => T;
    protected readonly _onGetFun: (element: T) => void;
    protected readonly _onReleaseFun: (element: T) => void;
    protected readonly _onDestroyFun: (element: T) => void;

    protected readonly _stack: Stack<T> = null;

    protected readonly _maxSize: number = 0;
    protected readonly _isReleaseCheck: boolean = false;

    private _total: number = 0;

    get total(): number {
        return this._total;
    }

    get active(): number {
        return this._total - this._stack.size();
    }

    get count(): number {
        return this._stack.size();
    }

    public size() {
        return this._stack.size();
    }

    public constructor(
        createFun: () => T,
        onGetFun: (element: T) => void,
        onReleaseFun: (element: T) => void,
        onDestroyFun: (element: T) => void,
        isReleaseCheck: boolean = false,
        maxSize = 10000,
    ) {
        if (createFun == null) {
            throw new Error("创建函数为空!!");
        }

        if (maxSize <= 0) {
            throw new Error("最大数量必须大于0:" + maxSize);
        }

        this._stack = new Stack<T>();
        this._maxSize = maxSize;
        this._isReleaseCheck = isReleaseCheck;
        this._createFun = createFun;
        this._onGetFun = onGetFun;
        this._onReleaseFun = onReleaseFun;
        this._onDestroyFun = onDestroyFun;
    }

    clear(): void {
        if (this._onDestroyFun != null) {
            this._stack.forEach((element) => {
                this._onDestroyFun(element);
            });
        }
        this._stack.clear();
        this._total = 0;
    }

    get(): T {
        let element: T = null;

        if (this._stack.size() == 0) {
            element = this._createFun();
            this._total++;
        } else {
            element = this._stack.pop();
        }

        if (this._onGetFun != null) {
            this._onGetFun(element);
        }

        return element;
    }

    release(element: T) {
        if (this._isReleaseCheck && this._stack.size() > 0) {
            if (this._stack.has(element)) {
                throw new Error("尝试释放一个已经在对象池中的对象!!:" + element);
            }
        }

        if (this._onReleaseFun != null) {
            this._onReleaseFun(element);
        }

        if (this._total == 0) {
            if (this._onDestroyFun != null) {
                this._onDestroyFun(element);
            }
        } else {
            if (this._stack.size() < this._maxSize) {
                this._stack.push(element);
            } else {
                // 放不下走销毁
                if (this._onDestroyFun != null) {
                    this._onDestroyFun(element);
                }

                this._total--;
            }
        }
    }
}