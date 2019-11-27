/**
 * 栈
 *
 * @export
 * @class Stack
 * @template T
 */
export default class Stack<T> {
	private items = new Array<T>();

	/**
	 * 入栈
	 *
	 * @param {T} value
	 * @memberof Stack
	 */
	push(value: T) {
		this.items.push(value);
	}

	/**
	 * 出栈
	 *
	 * @returns
	 * @memberof Stack
	 */
	pop() {
		if (this.isEmpty()) {
			throw new Error("空栈！");
		}
		return this.items.pop();
	}

	/**
	 * 返回栈顶元素
	 *
	 * @memberof Stack
	 */
	peek() {
		if (this.isEmpty()) {
			throw new Error("空栈！");
		}
		return this.items[this.items.length - 1];
	}

	/**
	 * 是否为空
	 *
	 * @returns
	 * @memberof Stack
	 */
	isEmpty() {
		return this.items.length === 0;
	}

	/**
	 * 清空栈
	 *
	 * @memberof Stack
	 */
	clear() {
		delete this.items;
		this.items = [];
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

	/**
	 * 显示
	 *
	 * @returns
	 * @memberof Queue
	 */
	display() {
		let tmp = "";
		for (let index = this.items.length - 1; index >= 0; index--) {
			tmp += JSON.stringify(this.items[index]) + "\n";
		}
		console.log(tmp);
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
}
