import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);
const homePage = path.join(currentDirectory, "public", "index.html");

const books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho", price: 350 },
  { id: 2, title: "Wings of Fire", author: "A. P. J. Abdul Kalam", price: 250 },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", price: 550 }
];

function sendJSON(response, status, data) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data, null, 2));
}

function getRequestData(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", chunk => body += chunk);
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    request.on("error", reject);
  });
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, "http://localhost:3000");

  if (request.method === "GET" && url.pathname === "/") {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end("<h1>Welcome to PageTurn Library</h1><p>Library Book Management using Node.js HTTP module.</p><p>Visit <a href='/home'>Home Page</a> or <a href='/books'>View Books API</a>.</p>");
    return;
  }

  if (request.method === "GET" && url.pathname === "/books") {
    sendJSON(response, 200, books);
    return;
  }

  if (request.method === "GET" && url.pathname === "/about") {
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("PageTurn Library is a simple book management application developed with Node.js HTTP and FS modules.");
    return;
  }

  if (request.method === "GET" && url.pathname === "/home") {
    fs.readFile(homePage, "utf8", (error, html) => {
      if (error) {
        response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("500 - Home page could not be loaded.");
        return;
      }
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.end(html);
    });
    return;
  }

  if (request.method === "POST" && url.pathname === "/add-book") {
    try {
      const data = await getRequestData(request);
      const { id, title, author, price } = data;

      if (id === undefined || !title || !author || price === undefined ||
          !Number.isFinite(Number(price)) || Number(price) < 0) {
        sendJSON(response, 400, { message: "Please provide valid id, title, author and price." });
        return;
      }

      if (books.some(book => book.id === Number(id))) {
        sendJSON(response, 409, { message: "Book ID already exists." });
        return;
      }

      const newBook = {
        id: Number(id),
        title: String(title).trim(),
        author: String(author).trim(),
        price: Number(price)
      };
      books.push(newBook);
      sendJSON(response, 201, { message: "Book added successfully", book: newBook });
    } catch {
      sendJSON(response, 400, { message: "Invalid JSON request." });
    }
    return;
  }

  sendJSON(response, 404, { message: "Route not found." });
});

server.listen(3000, () => {
  console.log("HTTP Server running at http://localhost:3000");
});
