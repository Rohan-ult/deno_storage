import { KeyValue } from "./key-value.ts";
import { join } from "https://deno.land/std/path/mod.ts";

export class LocalStorage<T> extends KeyValue<T> {
    constructor(private _path: string = join(Deno.cwd(), "local-storage.json")) {
        super()
    }
    load() {
        return Deno.readTextFile(this._path)
            .then(text => this.data = JSON.parse(text))
            .catch(err => {
                if (err instanceof Deno.errors.NotFound)
                    return this.save()
                throw err
            })
    }
    save() {
        return Deno.writeTextFile(this._path, JSON.stringify(this.data))
    }
}
