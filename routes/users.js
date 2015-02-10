var express = require('express');
var router = express.Router();

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

var EntityModel = mongoose.model('Entity', Entity);


router.route('/nodes').get(function(req, res){ // LIST NODES
    return EntityModel.find(function(err, entities){
        if(!err){
            return res.send(entities);
        } else {
            return console.log(err);
        }
    });
}).post(function(req, res, next){ // CREATE NODES
    var entity;
    entity = new EntityModel({
        title: req.query.title,
        description: req.query.description,
        email: req.query.email,
        images: req.query.images,
        categories: req.query.categories,
        status: req.query.status,
        removed: false
    });
    entity.save(function(err){
        if(!err){
            return console.log("Created");
        } else {
            return console.log(err);
        }
    });
    return res.send(entity);
});
router.route('/nodes/:id').get(function(req, res, next){ // VIEW SPECIFIC NODES
    return EntityModel.findById(req.params.id, function (err, entity) {
        if(!err){
            return res.send(entity);
        } else {
            console.log(err);
        }
        return res.send(entity);
    });
}).put(function(req, res, next){ // UPDATE SPECIFIC NODES
    return EntityModel.findById(req.params.id, function(err, entity){
        entity.title = req.query.title;
        entity.description = req.query.description;
        entity.email = req.query.email;
        entity.images = req.query.images;
        entity.categories = req.query.categories;
        entity.status = req.query.status;

        return entity.save(function(err){
            if(!err){
                console.log("Update");
            } else {
                console.log(err);
            }
            return res.send(entity);
        });
    });
});
/* ------------------------------------Bulk Destroy Action----------------------------------------------*/
router.route('/nodes/destroy/:id').put(function(req, res, next){ // DELETE A SINGLE ENTITY UPDATING THE STATUS OF REMOVED FIELD
    return EntityModel.findById(req.params.id, function(err, entity){
        entity.removed = true;
        return entity.save(function(err){
            if(!err){
                console.log("Removed");
            } else {
                console.log(err);
            }
            return res.send(entity);
        });
    });
}).delete(function(req, res, next){ // DELETE A SINGLE ENTITY REAL FROM DB -- DANGEROUS --
    return EntityModel.findById(req.params.id, function(err, entity){
        return entity.remove(function(err){
            if(!err){
                console.log("Deleted from DB");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
});
router.delete('/nodes/destroy/all', function (req, res, next) { // Bulk destroy all FROM DB -- VERY DANGER --
    EntityModel.remove(function (err) {
        if (!err) {
            console.log("All has been deleted :(");
            return res.send('');
        } else {
            console.log(err);
        }
    });
});

module.exports = router;


//// Bulk update ------------------------------------ EXAMPLE BULK UPDATE ALL -----------------------------------------
//app.put('/api/products', function (req, res) {
//    var i, len = 0;
//    console.log("is Array req.body.products");
//    console.log(Array.isArray(req.body.products));
//    console.log("PUT: (products)");
//    console.log(req.body.products);
//    if (Array.isArray(req.body.products)) {
//        len = req.body.products.length;
//    }
//    for (i = 0; i < len; i++) {
//        console.log("UPDATE product by id:");
//        for (var id in req.body.products[i]) {
//            console.log(id);
//        }
//        ProductModel.update({ "_id": id }, req.body.products[i][id], function (err, numAffected) {
//            if (err) {
//                console.log("Error on update");
//                console.log(err);
//            } else {
//                console.log("updated num: " + numAffected);
//            }
//        });
//    }
//    return res.send(req.body.products);
//});