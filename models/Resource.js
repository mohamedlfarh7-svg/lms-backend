const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a resource title'],
    },
    type: {
      type: String,
      enum: ['video', 'pdf', 'text', 'link'],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      required: true,
    },
    duration: {
      type: Number, // بالدقائق
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resource', resourceSchema);