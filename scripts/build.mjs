import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const dist = resolve("dist");
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(resolve("index.html"), resolve(dist, "index.html"));
await cp(resolve("src"), resolve(dist, "src"), { recursive: true });
console.log(`Built static review gallery in ${dist}`);
