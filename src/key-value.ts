type key = string | number;
interface keyValue<T> {
    [key: string]: T;
    [key: number]: T;
}

export class KeyValue<T> {
    protected data: keyValue<T> = {};
    /**
     * ```ts
     *  ls.get('key') // 'value'
     *  ls.get(['key','key2']) // ['value','value2']
     * ```
     * *Note:* It return a referance.
     */
    get(key: key): T | undefined;
    get(key: key[]): (T | undefined)[];
    get(key: key | key[]): (T | undefined) | (T | undefined)[] {
        if (Array.isArray(key)) {
            let getData = (_key: key) => this.data[_key]
            return key.map(getData)
        }
        return this.data[key]
    }
    /**
     * ```ts
     * ls.set('key','value');
     * ls.set([ ['key','value'] ]); // set data from entrie
     * ls.set({ key : 'value' }) // set data from Object
     * ```
     */
    set(key: key, value: T): T;
    set(object: keyValue<T>): void;
    set(entries: Iterable<readonly [key, T]>): void;
    set(key: key, data: (data: T | undefined) => T | void): T | void;
    set(key: any, value?: any) {
        if (typeof value == "function") {
            let setter = value(this.data[key]);
            return setter && (this.data[key] = setter);
        }
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
    /** Returns an iterable of keys. */
    keys() {
        return Object.keys(this.data)
    }
    /** Returns an iterable of values. */
    values() {
        return Object.values(this.data)
    }
    /** Returns an iterable of key, value pairs for every entry. */
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
