## Storage
A key-value is a in-memory storage for deno.

```ts
import { LocalStorage } from "https://deno.land/x/storage@0.0.5/mod.ts"

const storage = new LocalStorage<string>();

// set data
storage.set({
  key: "value",
  key2: "value2"
})
storage.set([
  ["key", "value"],
  ["key2" ,"value2"]
])
storage.set("key","value")

// get data
// `note` get return shalow copy 
storage.get("key") // "value"
storage.get(["key","key2"]) // ["value","value2"]
storage.keys() // ["key", "key2"]
storage.values() // ["value", "value2"]
storage.entries() // [["key", "value"], ["key2", "value2"]]

// check and delete data
storage.delete("key2")
storage.has("key2") // false
storage.clear() // {}

const storage2 = new LocalStorage<{prop : string}>();
// update data 
storage2.set("ID", data => {
   data ?? = { prop: 'value' } // default data
   data.prop = "newValue";
   return data; // update data 
})

// sava data
await storage.save();
await storage2.save();
```
