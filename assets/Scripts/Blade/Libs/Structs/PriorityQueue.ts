
class QueueElement<T> {
    element: T = null;
    priority: number = 0;
    constructor(element: T, priority: number) {
        this.element = element;
        this.priority = Math.floor(priority);
    }
}

/**
 * 优先队列
 *
 * @export
 * @class PriorityQueue
 * @template T
 */
export default class PriorityQueue<T> {
    private items: Array<QueueElement<T>> = [];


    /**
     * 大小
     */
    size() {
        return this.items.length;
    }

	/**
	 * 入队
	 *
	 * @param {T} element
	 * @param {number} priority
	 * @memberof PriorityQueue
	 */
    enqueue(element: T, priority: number = 0) {
        let queueElement = new QueueElement(element, priority);
        if (this.isEmpty()) {
            this.items.push(queueElement);
            return;
        }
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority > this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(queueElement);
        }
    }

	/**
	 * 出队
	 *
	 * @returns
	 * @memberof Queue
	 */
    dequeue() {
        if (this.isEmpty()) {
            throw new Error("This queue is empty");
        } else {
            return this.items.shift();
        }
    }

	/**
	 * 是否为空
	 *
	 * @returns
	 * @memberof Queue
	 */
    isEmpty() {
        if (this.items.length == 0) {
            return true;
        } else {
            return false;
        }
    }

	/**
	 * 首元素
	 *
	 * @returns
	 * @memberof Queue
	 */
    front() {
        if (this.isEmpty()) {
            throw new Error("This queue is empty");
        } else {
            return this.items[0];
        }
    }

	/**
	 * 尾元素
	 *
	 * @returns
	 * @memberof Queue
	 */
    back() {
        if (this.isEmpty()) {
            throw new Error("This queue is empty");
        } else {
            return this.items[this.items.length - 1];
        }
    }

	/**
	 * 显示
	 *
	 * @returns
	 * @memberof Queue
	 */
    display() {
        let tmp = "";
        for (let index = 0; index < this.items.length; index++) {
            tmp += JSON.stringify(this.items[index].element) + "\n";
        }
        console.log(tmp);
    }

	/**
	 * 清空队列
	 *
	 * @memberof Queue
	 */
    clear() {
        delete this.items;
        this.items = [];
    }


    /**
     * 判断元素是否存在
     * @param item
     */
    has(item: T) {
        if (this.isEmpty) {
            return false;
        } else {
            for (let index = 0; index < this.items.length; index++) {
                if (this.items[index].element == item) {
                    return true;
                }
            }
            return false;
        }
    }

    /**
     * 移除指定元素
     */
    remove(item: T) {
        for (let index = 0; index < this.items.length; index++) {
            if (this.items[index].element == item) {
                this.items.splice(index, 1)
            }
        }
    }

    /**
     * 遍历
     * @param callbackfn
     * @param thisArg
     */
    forEach(callbackfn: (value: T) => void, thisArg?: any): void {
        this.items.forEach((value, index, array) => {
            callbackfn.call(thisArg, value)
        })
    }

    some(callbackfn: (value: T) => unknown, thisArg?: any): boolean {
        return this.items.some((value, index, array) => {
            return callbackfn.call(thisArg, value)
        })
    }
}

