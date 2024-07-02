import mongoose from "mongoose";

const { Schema,model} = mongoose;

const bookSchema = new Schema({
  /**
 * title (String, required)
• content (String, required)
• author (String, required)
• publishedDate (Date, default to the current date
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
    type: String,
    require: true,
  },
  publishedDate: {
     type: Date,
     default: Date.now
     }},{
        timestamps:true
     });

export default mongoose.models.Book || model("Book",bookSchema)