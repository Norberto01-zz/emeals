'use strict';
/**
 * Created by root on 2/10/15.
 */
//var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@127.0.0.1:27017/meals';
//var mongoose = require('mongoose');
//var connection = mongoose.createConnection(dbUrl);
//connection.on('error', console.error.bind(console, 'connection error:'));
//connection

var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost:27017/meals');
connection.once('open', function () {
    console.info('Connected to database')
});
var Schema = mongoose.Schema;

exports.dbconnection = function db (req, res, next) {
    return {
        CategoriesModel: mongoose.model('Categories', Categories).on('index', function (err){
            console.log('On ERROR index', err)
        }),
        PicturesModel: mongoose.model('Pictures', Pictures).on('index', function (err){
            console.log('On ERROR index', err)
        }),
        UsersModel: mongoose.model('Users', Users).on('index', function (err){
            console.log('On ERROR index', err)
        }),
        EntitiesModel: mongoose.model('Entities', Entities).on('Entities',function(err){
            console.log('Ensure Entities Error', err);
        })
    };
};
//var EntityModel = mongoose.model('Entity', Entity);


var Users = new Schema({
    entity_id:{ type: Schema.Types.ObjectId, ref: 'Entity', required: true, index: true },
    last_name:{ type: String, trim: true },
    username:{ type: String, required: true, trim: true, index: true },
    password:{ type: String, index: true  },
    hash:{ type: String, required: false },
    email:{ type: String, required: true, trim: true },
    phone:{ type: String, required: false }
});

var Entities = new Schema({
    name: { type: String, required: true, trim: true },
    details: { type: String, required: true },
    status: { type: Boolean, default: true },// Active
    removed: { type: Boolean, default: false },// Delete Just the DB Master could get back this action...
    created: { type: Date, default: Date.now, required: true },
    updated: { type: Date, default: Date.now, required: true }
});
//Entities.index()

Entities.pre('save', function (next) {
    if (!this.isModified('updated')) this.updated = new Date;
    next();
});

var Pictures = new Schema({
    kind: { type: String, enum: ['thumbnail', 'catalog', 'detail', 'zoom'],    required: true },
    url: { type: String, required: true }
});

var Categories = new Schema({

});