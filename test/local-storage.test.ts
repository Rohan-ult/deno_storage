import { LocalStorage } from "../mod.ts";
const ls = new LocalStorage;

Deno.test("Save data", async () => {
    ls.set({
        key: "value",
        key2: "value2"
    })
    await ls.save()
})
