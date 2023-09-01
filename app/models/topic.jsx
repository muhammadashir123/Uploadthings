import { Schema, models, model } from "mongoose";
const TopicSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: [true, "desc is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required for uploading"],
  },
});
const Topic = models.Topic || model("Topic", TopicSchema);
export default Topic;
