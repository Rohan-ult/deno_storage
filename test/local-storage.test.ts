import { LocalStorage } from "../mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

let ls = new LocalStorage;

Deno.test("Load data , Save data", async () => {
    ls.set({
        key: "value",
        key2: "value2"
    })
    await ls.save()
    await ls.load()
    assertEquals(ls.get(["key", "key2"]), ["value", "value2"])
})
