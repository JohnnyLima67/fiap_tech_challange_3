const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    file: { type: String, required: true },
}, { timestamps: true });

const PostModel = model('Post', postSchema);

module.exports = PostModel;