import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: true,
      trim: true,
    },
    deck: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Draft', 'In Review', 'Published'],
      default: 'Draft',
    },
    publishAt: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
    },
    body: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model('Article', articleSchema);

export default Article;
