import mongoose from "mongoose";

const { Schema, model } = mongoose;

const authorSchema = new Schema(
  {
    /**
name (String, required)
email
password
• bio (String)
• birthDate (Date)

 */
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    loginState: {
      type: Boolean,
      default: false,
    },
    bio: String,
    birthDate: Date,
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.models.Author || model("Author", authorSchema);
export default Author;
