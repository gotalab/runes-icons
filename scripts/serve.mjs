import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";

const root = resolve(process.argv[2] ?? ".");
const port = Number(process.env.PORT ?? 4173);
const mime = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png" };

createServer((request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  let path = join(root, pathname === "/" ? "index.html" : pathname);
  try {
    if (statSync(path).isDirectory()) path = join(path, "index.html");
    response.writeHead(200, { "content-type": mime[extname(path)] ?? "application/octet-stream" });
    createReadStream(path).pipe(response);
  } catch {
    response.writeHead(404, { "content-type": "text/plain" });
    response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Runes review: http://127.0.0.1:${port}`));
