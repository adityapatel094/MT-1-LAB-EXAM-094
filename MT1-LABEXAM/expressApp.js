import express from "express";

const app = express();
const PORT = 4000;

app.use(express.json());

let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho", price: 350, category: "Fiction" },
  { id: 2, title: "Wings of Fire", author: "A. P. J. Abdul Kalam", price: 250, category: "Biography" },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", price: 550, category: "Programming" }
];

function isValidBook(book) {
  return book &&
    book.id !== undefined &&
    typeof book.title === "string" && book.title.trim() !== "" &&
    typeof book.author === "string" && book.author.trim() !== "" &&
    Number.isFinite(Number(book.price)) && Number(book.price) >= 0;
}

// GET /books - get all books
app.get("/books", (request, response) => {
  response.status(200).json(books);
});

// GET /books/:id - get one book
app.get("/books/:id", (request, response) => {
  const book = books.find(item => item.id === Number(request.params.id));

  if (!book) {
    return response.status(404).json({ message: "Book not found." });
  }

  response.status(200).json(book);
});

// POST /books - add a book
app.post("/books", (request, response) => {
  const data = request.body;

  if (!isValidBook(data)) {
    return response.status(400).json({
      message: "Please provide valid id, title, author and price."
    });
  }

  if (books.some(item => item.id === Number(data.id))) {
    return response.status(409).json({ message: "Book ID already exists." });
  }

  const newBook = {
    id: Number(data.id),
    title: data.title.trim(),
    author: data.author.trim(),
    price: Number(data.price),
    category: data.category || "General"
  };

  books.push(newBook);
  response.status(201).json({
    message: "Book added successfully",
    book: newBook
  });
});

// PUT /books/:id - update a book
app.put("/books/:id", (request, response) => {
  const book = books.find(item => item.id === Number(request.params.id));

  if (!book) {
    return response.status(404).json({ message: "Book not found." });
  }

  const { title, author, price, category } = request.body;

  if ((title !== undefined && (typeof title !== "string" || !title.trim())) ||
      (author !== undefined && (typeof author !== "string" || !author.trim())) ||
      (price !== undefined && (!Number.isFinite(Number(price)) || Number(price) < 0))) {
    return response.status(400).json({ message: "Invalid book details." });
  }

  if (title !== undefined) book.title = title.trim();
  if (author !== undefined) book.author = author.trim();
  if (price !== undefined) book.price = Number(price);
  if (category !== undefined) book.category = category;

  response.status(200).json({
    message: "Book updated successfully",
    book
  });
});

// DELETE /books/:id - delete a book
app.delete("/books/:id", (request, response) => {
  const index = books.findIndex(item => item.id === Number(request.params.id));

  if (index === -1) {
    return response.status(404).json({ message: "Book not found." });
  }

  const deletedBook = books.splice(index, 1)[0];

  response.status(200).json({
    message: "Book deleted successfully",
    book: deletedBook
  });
});

// Invalid JSON handler
app.use((error, request, response, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return response.status(400).json({ message: "Invalid JSON request." });
  }
  next(error);
});

// Unknown route handler
app.use((request, response) => {
  response.status(404).json({ message: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});
