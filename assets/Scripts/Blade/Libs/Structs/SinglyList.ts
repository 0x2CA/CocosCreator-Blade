class Node<T> {
	value: T = null;
	next: Node<T> = null;
	constructor(value: T) {
		this.value = value;
	}
	toString() {
		return JSON.stringify(this.value);
	}
}
/**
 * 单向链表
 *
 * @export
 * @class SinglyList
 * @template T
 */
export default class SinglyList<T> {
	private head: Node<T> = null;
	private length = 0;
	/**
	 * 添加元素在链尾
	 *
	 * @param {T} value
	 * @returns
	 * @memberof SinglyList
	 */
	addNodeOnBack(value: T) {
		let node = new Node(value);
		let currentNode = this.head;

		//第一个
		if (!currentNode) {
			this.head = node;
			this.length++;
			return node;
		}

		//查找最后
		while (currentNode.next) {
			currentNode = currentNode.next;
		}
		currentNode.next = node;
		this.length++;
		return node;
	}

	/**
	 * 添加元素在链头
	 *
	 * @param {T} value
	 * @memberof SinglyList
	 */
	addNodeOnFront(value: T) {
		let newNode = new Node(value);
		if (!this.head) {
			this.head = newNode;
		}
		newNode.next = this.head;
		this.head = newNode;
	}

	/**
	 * 添加节点在指定位置
	 *
	 * @param {number} index
	 * @param {T} value
	 * @memberof SinglyList
	 */
	addNodeByIndex(index: number, value: T) {
		index = Math.floor(index);
		if (index < 0 || index >= this.length) {
			return null;
		}
		let newNode = new Node(value);
		if (index == 0) {
			newNode.next = this.head;
			this.head = newNode;
			return this.head;
		}
		let tmp = this.getNodeByIndex(index - 1);
		if (tmp) {
			newNode.next = tmp.next;
			tmp.next = newNode;
			return newNode;
		}
	}

	/**
	 * 删除指定位置的节点
	 *
	 * @param {number} index
	 * @returns
	 * @memberof SinglyList
	 */
	removeNodeByIndex(index: number) {
		index = Math.floor(index);
		if (index < 0 || index >= this.length) {
			return null;
		}
		let tmpNode = this.head;
		if (index == 0) {
			this.head = this.head.next;
			return tmpNode;
		}

		for (let i = 0; i < index - 1; i++) {
			tmpNode = tmpNode.next;
		}
		let resultNode = tmpNode.next;
		tmpNode.next = resultNode.next;
		resultNode.next = null;
		return resultNode;
	}

	/**
	 * 删除指定节点
	 *
	 * @param {Node<T>} node
	 * @returns
	 * @memberof SinglyList
	 */
	removeNodeByNode(node: Node<T>) {
		return this.removeNodeByIndex(this.getIndexByNode(node));
	}

	/**
	 * 删除指定元素的节点
	 *
	 * @param {Node<T>} node
	 * @returns
	 * @memberof SinglyList
	 */
	removeNodeByValue(value: T) {
		return this.removeNodeByIndex(this.getIndexByValue(value));
	}

	/**
	 * 修改指定位置的内容
	 *
	 * @param {number} index
	 * @param {T} value
	 * @returns
	 * @memberof SinglyList
	 */
	setValueByIndex(index: number, value: T) {
		index = Math.floor(index);
		if (index < 0 || index >= this.length) {
			return;
		}
		let tmp = this.getNodeByIndex(index);
		if (tmp) {
			tmp.value = value;
		}
	}

	/**
	 * 查找节点
	 *
	 * @param {T} value
	 * @returns
	 * @memberof SinglyList
	 */
	getNodeByValue(value: T) {
		var currNode = this.head;
		while (currNode && currNode.value != value) {
			currNode = currNode.next;
		}
		return currNode;
	}

	/**
	 * 获取指定位置节点
	 *
	 * @param {number} index
	 * @returns
	 * @memberof SinglyList
	 */
	getNodeByIndex(index: number) {
		index = Math.floor(index);
		if (index < 0 || index >= this.length) {
			return null;
		}
		let tmpNode = this.head;
		for (let i = 0; i < index; i++) {
			tmpNode = tmpNode.next;
		}
		return tmpNode;
	}

	/**
	 * 获取节点位置
	 *
	 * @param {Node<T>} node
	 * @returns
	 * @memberof SinglyList
	 */
	getIndexByNode(node: Node<T>) {
		let index = 0;
		let tmpNode = this.head;
		while (tmpNode && node != tmpNode) {
			tmpNode = tmpNode.next;
			index += 1;
		}
		if (!tmpNode) {
			return -1;
		}
		return index;
	}

	/**
	 * 获取元素位置
	 *
	 * @param {T} value
	 * @returns
	 * @memberof SinglyList
	 */
	getIndexByValue(value: T) {
		return this.getIndexByNode(this.getNodeByValue(value));
	}

	/**
	 * 链表反转
	 *
	 * @returns
	 * @memberof SinglyList
	 */
	ReverseIteratively() {
		let pReversedHead = this.head;
		let pNode = this.head;
		let pPrev = null;
		while (pNode != null) {
			let pNext = pNode.next;
			if (pNext == null) {
				pReversedHead = pNode;
			}
			pNode.next = pPrev;
			pPrev = pNode;
			pNode = pNext;
		}
		this.head = pReversedHead;
		return this.head;
	}

	/**
	 * 查询中间节点
	 *
	 * @returns
	 * @memberof SinglyList
	 */
	searchMid() {
		// 快指针
		let fast = this.head;
		// 慢指针
		let slow = this.head;
		while (fast != null && fast.next != null && fast.next.next != null) {
			fast = fast.next.next;
			slow = slow.next;
		}
		return slow;
	}

	/**
	 * 显示
	 *
	 * @memberof SinglyList
	 */
	display() {
		let currNode = this.head;
		let tmp = "";
		while (currNode) {
			tmp += JSON.stringify(currNode.value) + "\n";
			currNode = currNode.next;
		}
		cc.log(tmp);
	}

	/**
	 * 是否为空
	 *
	 * @memberof SinglyList
	 */
	isEmpty() {
		return this.length === 0;
	}

	/**
	 * 大小
	 *
	 * @returns
	 * @memberof SinglyList
	 */
	size() {
		return this.length;
	}
}


