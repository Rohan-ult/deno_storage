import { KeyValue } from "../mod.ts";
import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";

let keyValue = new KeyValue;

Deno.test("Set data , Get data", () => {
    keyValue.set({
        key: "value"
    })
    keyValue.set([
        ["key2", "value2"]
    ])
    keyValue.set("key3", "value3")

    assert(keyValue.get("key3") == "value3")
    assertEquals(keyValue.get(["key", "key2"]), ["value", "value2"])
})

Deno.test("Delete data , Has data , Clear data", () => {
    assert(keyValue.has("key3") == true)
    assert(keyValue.delete("key3"))
    assert(keyValue.has("key3") == false)
})

Deno.test("get Keys , Values , Entries", () => {
    assertEquals(keyValue.keys(), ["key", "key2"])
    assertEquals(keyValue.values(), ["value", "value2"])
    assertEquals(keyValue.entries(), [["key", "value"], ["key2", "value2"]])
})

Deno.test("Clear data", () => {
    // database is a shallow copy
    keyValue.forEach((value, key, database) => {
        if (value == "value") 
            database[key] = null
    })
    assertEquals(keyValue.clear(), {})
})
