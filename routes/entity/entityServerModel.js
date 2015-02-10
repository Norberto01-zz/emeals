/**
 * Created by root on 2/10/15.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/meals');

var Schema = mongoose.Schema;

var Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'catalog', 'detail', 'zoom'],
        required: true
    },
    url: { type: String, required: true }
});

var Categories = new Schema({
    name: String
});

var Entity = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, unique: true },
    images: [Images],
    categories: [Categories],
    modified: { type: Date, default: Date.now },
    status : { type: Boolean, default: true },// Active
    removed: { type: Boolean, default: false }// Delete Just the DB Master could get back this action...
});