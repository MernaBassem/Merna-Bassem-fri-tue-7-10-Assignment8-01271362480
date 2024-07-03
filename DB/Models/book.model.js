import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    /**
 * title (String, required)
• content (String, required)
• author (String, required)
• publishedDate (Date, default to the current date)
 */
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Author",
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.models.Book || model("Book", bookSchema);
export default Book;
