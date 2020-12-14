type key = string | number;
interface keyValue<T> {
    [key: string]: T;
    [key: number]: T;
}

export class KeyValue<T> {
    protected data: keyValue<T> = {};
    get(key: key): T;
    get(key: key[]): T[];
    get(key: key | key[]) {
        if (Array.isArray(key))
            return key.map(_key => this.data[_key])

        return this.data[key]
    }
    set(key: key, value: T): T;
    set(object: keyValue<T>): void;
    set(entries: Iterable<readonly [key, T]>): void;
    set(key: any, value?: any) {
        if (typeof key == "string")
            return this.data[key] = value
        if (Array.isArray(key))
            Object.assign(this.data, Object.fromEntries(key))
        else if (typeof key == "object")
            Object.assign(this.data, key)
    }
    has(key: key) {
        return key in this.data
    }
    delete(key: key) {
        return delete this.data[key]
    }
    keys() {
        return Object.keys(this.data)
    }
    values() {
        return Object.values(this.data)
    }
    entries() {
        return Object.entries(this.data)
    }
    clear() {
        return this.data = {}
    }
    forEach(callbackFn: (value: T, key: any, database: keyValue<T>) => void) {
        for (const [key, value] of this.entries())
            callbackFn(value, key, this.data)
    }
}