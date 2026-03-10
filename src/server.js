/**
 * Небольшое Node-приложение — HTTP API для демо-модуля
 */

import http from "node:http";
import { greet, add, getTimestamp } from "./index.js";

const PORT = Number(process.env.PORT) || 3000;

function send(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function parseQuery(url) {
  const idx = url.indexOf("?");
  if (idx === -1) return {};
  return Object.fromEntries(
    new URLSearchParams(url.slice(idx + 1)).entries()
  );
}

const server = http.createServer((req, res) => {
  const [path, queryStr] = (req.url || "/").split("?");
  const query = parseQuery(req.url || "/");

  if (req.method !== "GET") {
    send(res, 405, { error: "Method Not Allowed" });
    return;
  }

  // GET / — инфо о приложении
  if (path === "/" || path === "") {
    send(res, 200, {
      name: "demo-actions",
      description: "Demo API for GitHub Actions",
      endpoints: {
        "/": "this info",
        "/hello": "GET /hello?name=World → greeting",
        "/add": "GET /add?a=1&b=2 → sum",
        "/time": "GET /time → server time",
      },
      time: getTimestamp(),
    });
    return;
  }

  // GET /hello?name=...
  if (path === "/hello") {
    const name = query.name || "World";
    send(res, 200, { message: greet(name) });
    return;
  }

  // GET /add?a=1&b=2
  if (path === "/add") {
    const a = Number(query.a);
    const b = Number(query.b);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      send(res, 400, { error: "Need query params a and b (numbers)" });
      return;
    }
    send(res, 200, { a, b, sum: add(a, b) });
    return;
  }

  // GET /time
  if (path === "/time") {
    send(res, 200, { timestamp: getTimestamp() });
    return;
  }

  send(res, 404, { error: "Not Found" });
});

server.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
