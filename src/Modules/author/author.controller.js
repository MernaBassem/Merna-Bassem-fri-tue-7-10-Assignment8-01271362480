// Author Controller

import bcrypt from "bcrypt";
import Author from "../../../DB/Models/author.model.js";
import jwt from "jsonwebtoken";
import { sendEmailService } from "../../services/send-email.service.js";

// register Author
//1-Signup
/**
name (String, required)
email
password
bio (String)
 birthDate (Date)
*/

//--------------------------------

// signUp Author
export const signUp = async (req, res, next) => {
  const { name, email, password, bio, birthDate } = req.body;

  try {
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);
    // Check if the email already exists
    const isEmailExist = await Author.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({ message: "Email already exists." });
    }
    // take new instance
    const authorInstance = new Author({
      name,
      email,
      password: passwordHash,
      bio,
      birthDate,
    });
    // generate token
    const token = jwt.sign(
      { _id: authorInstance._id },
      "conformationLinkToken",
      {
        expiresIn: "1h",
      }
    );
    // confirmation Link
    const confirmationLink = `${req.protocol}://${req.headers.host}/author/confirm-email/${token}`;
    // send email
    // send email
    const isEmailSent = await sendEmailService({
      to: email,
      subject: "Welcome to our app",
      textMessage: "Hello, welcome to our app",
      htmlMessage: `<a href="${confirmationLink}">Click here to confirm your email</a>`,
    });
    if (isEmailSent.rejected.length) {
      return res.status(400).json({ message: "Email not sent" });
    }
    // Create a new author
    const author = await authorInstance.save();

    // Respond with success
    return res.status(201).json({ message: "Successfully registered", author });
  } catch (error) {
    // Handle errors
    return res.status(400).json({ message: error.message });
  }
};

//-----------------------------------------
export const confirmEmail = async (req, res) => {
  try {
    // destruct token from params
    const { token } = req.params;
    // verify token
    const { _id } = jwt.verify(token, "conformationLinkToken");
    // find and update author from db
    const author = await Author.findOneAndUpdate(
      { _id, isConfirmed: false },
      { isConfirmed: true },
      { new: true }
    );
    // if user not found
    if (!author) {
      return res.status(400).json({ message: "Author not found" });
    }
    // response
    res.status(200).json({ message: "Email confirmed" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//----------------------------------
// signIn Author
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const author = await Author.findOne({ email });
    if (!author) {
      return res
        .status(400)
        .json({ message: "Email or Password is incorrect" });
    }
    if (author.isConfirmed === false) {
      return res
        .status(400)
        .json({ message: "Please Frist Active Your Email " });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, author.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Email or Password is incorrect" });
    }

    // Sign a JWT token with author's ID and a secret key (make sure to use a strong secret)
    const token = jwt.sign({ authorId: author._id }, "your_secret_key", {
      expiresIn: "1h",
    }); // Token expires in 1 hour

    // Update login state
    const updatedAuthor = await Author.findByIdAndUpdate(author._id, {
      loginState: true,
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//--------------------------------------------------------------

// logout Author

export const logOut = async (req, res, next) => {
  try {
    // Ensure req.authorId exists
    if (!req.authorId) {
      return res.status(400).json({ message: "Author ID is required" });
    }

    // Update the login state
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.authorId,
      {
        loginState: false,
      },
      { new: true }
    );

    if (!updatedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    return res.status(200).json({ message: "LogOut Successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//-------------------------------------------
// get author data login

export const getAuthor = async (req, res, next) => {
  try {
    const author = await Author.findById(req.authorId);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    // check login state true
    if (!author.loginState) {
      return res.status(401).json({ message: "Please login" });
    }
    return res.status(200).json({ author });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//-------------------------------------------
// get all authors

export const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();
    return res.status(200).json({ authors });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//-------------------------------
// update author data login use mongoose

export const updateAuthor = async (req, res, next) => {
  try {
    const author = await Author.findById(req.authorId);
    const {name,bio,birthday} = req.body
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    // check login state true
    if (!author.loginState) {
      return res.status(401).json({ message: "Please login" });
    }
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.authorId,
      { name, bio, birthday },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Author Updated Successfully", updatedAuthor });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//--------------------------------------------------

// delete author data login use mongoose

export const deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findById(req.authorId);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    // check login state true
    if (!author.loginState) {
      return res.status(401).json({ message: "Please login" });
    }
    const deletedAuthor = await Author.findByIdAndDelete(req.authorId);
    return res
      .status(200)
      .json({ message: "Author Deleted Successfully", deletedAuthor });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//-----------------------------------------------
// get author by pagination
export const getAuhtorByPagination = async (req, res, next) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const authors = await Author.find().skip(skip).limit(limit);
    return res.status(200).json({ count: authors.length, authors });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// ---------------------------------------------

// get author with book

export const getAuthorWithBook = async (req, res, next) => {
  try {
    const author = await Author.findById(req.authorId).populate("books");
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    if (!author.loginState) {
      return res.status(401).json({ message: "Please login" });
    }
    return res.status(200).json({ author });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//--------------------------------------
// serach by name and bio
export const searchAuthor = async (req, res, next) => {
  try {
    const { wordSearch } = req.query;
    if (!wordSearch) {
      return res.status(404).json({ message: "wordSearch is required" });
    }
    const searchRegex = new RegExp(wordSearch, "i");
    const authors = await Author.find({
      $or: [
        {
          name: { $regex: searchRegex },
        },
        {
          bio: { $regex: searchRegex },
        },
      ],
    });
    return res.status(200).json({ count: authors.length, wordSearch, authors });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
