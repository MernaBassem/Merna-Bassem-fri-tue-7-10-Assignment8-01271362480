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
      publishedDate,
    });
    const book = await newBook.save();
    return res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//-------------------------------------
// get All Book

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    return res.status(200).json({ books });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//----------------------------------------------
//get specific book by id

export const getBookById = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const book = await Book.findById(_id).populate("author");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ book });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//----------------------------------------------
// update book by author created

export const updateBook = async (req, res, next) => {
  try {
    const { title, content, publishedDate } = req.body;
    const { _id } = req.params;
    // get info author
    const author = await Author.findById(req.authorId);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    // check author login
    if (!author.loginState) {
      return res.status(401).json({ message: "Please login" });
    }
    //get information book
    const book = await Book.findById(_id);
    // check book find
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    // check author id
    if (book.author.toString() !== req.authorId) {
      return res
        .status(401)
        .json({ message: "You are not authorized to update this book" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      _id,
      { title, content, publishedDate },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ message: "Book updated successfully", updatedBook });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//-------------------------------------------------
//delete book by author created

export const deleteBook = async (req, res, next) => {
  try {
    const author = await Author.findById(req.authorId);
    const { _id } = req.params;
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    if (!author.loginState) {
      return res.status(401).json({ message: "Please login" });
    }
    const book = await Book.findById(_id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.author.toString() !== req.authorId) {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete this book" });
    }
    const deletedBook = await Book.findByIdAndDelete(_id);
    return res
      .status(200)
      .json({ message: "Book deleted successfully", deletedBook });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//--------------------------
//getBookWithAuthor

export const getBookWithAuthor = async (req, res, next) => {
  try {
    const books = await Book.find().populate("author");
    return res.status(200).json({ books });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//----------------------------------
// get all book with pagination

export const getBookByPagination = async (req, res, next) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const books = await Book.find().skip(skip).limit(limit).populate("author");
    return res.status(200).json({ count: books.length, books });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//-------------------------------------
// search book by title or author
export const searchBook = async (req, res, next) => {
 try {
    const { wordSearch } = req.query;

    if (!wordSearch) {
      return res
        .status(400)
        .json({ message: "Query parameter 'wordSearch' is required" });
    }

    const searchRegex = new RegExp(wordSearch, 'i');

    // Find matching authors
    const matchingAuthors = await Author.find({ name: { $regex: searchRegex } });
    const authorIds = matchingAuthors.map(author => author._id);


    // Find books by title or author ID
    const books = await Book.find({
      $or: [
        { title: { $regex: searchRegex } },
        { author: { $in: authorIds } }
      ]
    }).populate('author');

    return res.status(200).json({ count: books.length, wordSearch ,books});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
