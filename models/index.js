//'use strict';
/**
 * Created by root on 2/10/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/meals');

var EntitySch = new Schema({
    name:{ type: String, trim: true, index: true},
    details:{ type: String, required: true, trim: true},
    status: { type: Boolean, default: true },// Active
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    removed: { type: Boolean, default: false }
});
var EntitySchema = mongoose.model('entity', EntitySch);
exports.EntitySchema = EntitySchema;

var UserSch =  new Schema({
    parent: [{ type : Schema.ObjectId, ref : 'entity' }],
    last_name: { type: String, trim: true },
    username: { type: String, trim: true, index: true },
    password: { type: String, trim: true },
    hash: { type: Date, default: Date.now },
    email: { type: String, trim: true },
    phone: { type: String, trim: true }
});
UserSch.methods.addParent = function(params){
    return this.parent.push(new EntitySchema({ name:params.name, details:params.details, status:params.status}));
};
var userSchema = mongoose.model('UserSchema', UserSch);
exports.UserSchema = userSchema;


