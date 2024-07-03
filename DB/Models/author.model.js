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
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: String,
    birthDate: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Author || model("Author", authorSchema);
