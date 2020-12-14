## Storage
A basic key-value storage for deno. 

```ts
import { LocalStorage } from "https://deno.land/x/storage/mod.ts"

let storage = new LocalStorage
// load data
await storage.load()

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

// sava data
await storage.save()
```
