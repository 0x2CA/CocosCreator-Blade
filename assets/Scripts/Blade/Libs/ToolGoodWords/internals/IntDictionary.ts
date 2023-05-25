export default class IntDictionary {
    private _keys: number[] = [];
    private _values: number[] = [];
    private last: number = 0;

    public init(keys: number[], values: number[]) {
        this._keys = keys;
        this._values = values;
        this.last = keys.length - 1;
    }

    public init2(dict: Map<number, number>) {
        let keys = Array.from(dict.keys()).sort((a, b) => {
            return a - b;
        });
        let values = new Array(keys.length);
        for (let i = 0; i < keys.length; i++) {
            values[i] = dict.get(keys[i]);
        }
        this._keys = keys;
        this._values = values;
        this.last = keys.length - 1;
    }


    public get keys() {
        return this._keys;
    }

    public get values() {
        return this._values;
    }

    public getValue(key: number) {
        if (this.last == -1) {
            return null;
        }
        if (this._keys[0] == key) {
            return this._values[0];
        }
        else if (this.last == 0 || this._keys[0] > key) {
            return null;
        }

        if (this._keys[this.last] == key) {
            return this._values[this.last];
        }
        else if (this._keys[this.last] < key) {
            return null;
        }

        let left = 0;
        let right = this.last;
        while (left + 1 < right) {
            let mid = (left + right) >> 1;
            let d = this._keys[mid] - key;

            if (d == 0) {
                return this._values[mid];
            } else if (d > 0) {
                right = mid;
            } else {
                left = mid;
            }
        }
        return null;
    }
}
