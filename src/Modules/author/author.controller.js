// Author Controller

import bcrypt from "bcrypt";
import Author from "../../../DB/Models/author.model.js";

// register Author
//1-Signup
/**
name (String, required)
email
password
bio (String)
 birthDate (Date)
*/


export const register = async (req, res, next) => {
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
    console.log("authorInstance", authorInstance);

    // Create a new author
    const author = await authorInstance.save();

    // Respond with success
    return res.status(201).json({ message: "Successfully registered", author });
  } catch (error) {
    // Handle errors
    return res.status(400).json({ message: error.message });
  }
};
