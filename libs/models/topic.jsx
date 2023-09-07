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
    imageUrl: {
      type: String,
      required: true,
    },
    imageName: {
      type: String,
      required: true,
    },
  },
});
const Topic = models.Topic || model("Topic", TopicSchema);
export default Topic;
