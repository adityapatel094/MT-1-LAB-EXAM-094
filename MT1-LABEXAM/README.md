# PageTurn Library — MT-1 Lab Examination

A Library Book Management Web Application made with Node.js HTTP, FS and Express.js.

## Project files
- `httpServer.js` — Part A: built-in HTTP server, routes, POST `/add-book`, FS static page.
- `expressApp.js` — Part B: Express REST API with GET, POST, PUT and DELETE.
- `public/index.html` — custom responsive library home page served through the FS module.
- `screenshots/` — save your actual practical screenshots here.
- `Practical_Report.docx` — report format with places to insert your own screenshots.

## Setup
Open this folder in VS Code terminal and run:
```bash
npm install
```

## Run Part A
```bash
node httpServer.js
```
Open:
- http://localhost:3000/
- http://localhost:3000/books
- http://localhost:3000/about
- http://localhost:3000/home

POST test:
- URL: `http://localhost:3000/add-book`
- Body: raw JSON with `id`, `title`, `author`, `price`.

## Run Part B
Open a **second terminal** in this same project folder:
```bash
node expressApp.js
```
Test with EchoAPI:
- GET `http://localhost:4000/books`
- GET `http://localhost:4000/books/1`
- POST `http://localhost:4000/books`
- PUT `http://localhost:4000/books/1`
- DELETE `http://localhost:4000/books/1`

For POST/PUT, select Body → JSON and send a JSON request body.

## GitHub
Create a repository named `MT1-LABEXAM`, then run:
```bash
git init
git add .
git commit -m "Initial library management project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/MT1-LABEXAM.git
git push -u origin main
```

For later changes:
```bash
git add .
git commit -m "Add library interface and REST API"
git push
```

## Screenshot reminder
Take genuine screenshots from your own running application and EchoAPI. Do not use sample or edited screenshots as proof of execution.
