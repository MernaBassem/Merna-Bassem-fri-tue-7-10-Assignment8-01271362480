// create book

import Author from "../../../DB/Models/author.model.js";
import Book from "../../../DB/Models/book.model.js";

export const createBook = async (req, res, next) => {
  try {
    const { title, content, publishedDate } = req.body;
    const author = await Author.findById(req.authorId);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    if (!author.loginState) {
      return res.status(401).json({ message: "Please login" });
    }
    const newBook = new Book({
      title,
      content,
      author: req.authorId,
      publishedDate
    });
    const book = await newBook.save();
    return res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
