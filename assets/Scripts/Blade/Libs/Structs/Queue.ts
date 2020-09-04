/**
 * 队列
 *
 * @export
 * @class Queue
 * @template T
 */
export default class Queue<T> {
	private items: Array<T> = new Array<T>();

	/**
	 * 入队
	 *
	 * @param {T} element
	 * @memberof Queue
	 */
	enqueue(element: T) {
		this.items.push(element);
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
	 * 数量
	 *
	 * @returns
	 * @memberof Stack
	 */
	size() {
		return this.items.length;
	}

	has(item: T) {
		if (this.isEmpty) {
			return false;
		} else {
			for (let index = 0; index < this.items.length; index++) {
				if (this.items[index] == item) {
					return true;
				}
			}
			return false;
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
			tmp += JSON.stringify(this.items[index]) + "\n";
		}
		cc.log(tmp);
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
}
