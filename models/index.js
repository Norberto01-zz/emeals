//'use strict';
/**
 * Created by root on 2/10/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/meals');

var EntitySch = new Schema({
    name:{ type: String, trim: true },
    details: { type: String, required: true, trim: true },
    status : { type: Boolean, default: true },// Active
    updated: { type: Date, default: Date.now },
    created: { type: String },
    removed: { type: Boolean, default: false }
});
//var EntitySchema = mongoose.model('entity', EntitySch);
//exports.EntitySchema = EntitySchema;

var UserSch =  new Schema({
    entity_sch: [EntitySch],
    last_name : { type: String, trim: true },
    username  : { type: String, trim: true, required: true, index: true },
    password  : { type: String, trim: true, required: true },
    hash      : { type: Date, default: Date.now },
    email     : { type: String, trim: true },
    phone     : { type: String, trim: true }
});

var userSchema = mongoose.model('UserSchema', UserSch);
exports.UserSchema = userSchema;

var PostSch = new Schema({


});

