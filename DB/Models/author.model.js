import mongoose from "mongoose";

const { Schema, model } = mongoose;

const authorSchema = new Schema(
  {
    /**
name (String, required)
• bio (String)
• birthDate (Date)
• books (Array of ObjectIds referencing Book model)

 */
    name: {
      type: String,
      require: true,
    },
    bio: String,
    birthDate: Date,

    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Author || model("Author", authorSchema);
