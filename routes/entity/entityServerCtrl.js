var express = require('express');
var router = express.Router();
var models = require('../../models');

objectId = require('mongodb').ObjectID;

//var entityServerModel = require('./entityServerModel');
//var db = require('././././models');
//var EntityModel = db.model('Entity', Entity);
//router.get('/', function(req, res){
//    res.send("Hola mundo!");
//});

var data = models.dbconnection(),
    EntityModel = data.EntitiesModel;
    EntityModel.on('index', function(err) {
        if (err) {
            console.error('Entity index error: %s', err);
        } else {
            console.info('Entity indexing complete');
        }
    });

var dataHandler = function (err, param, res){
    if(!err){
        return res.send(param);
    }else{
        return console.log(err);
    }
};
router.get('/cat', function(req, res){
    return data.CategoriesModel.find()(function(err, entity){dataHandler(err, entity, res)});
});

router.route('/nodes').get(function(req, res){ // LIST NODES
    return EntityModel.find(function(err, entity){dataHandler(err, entity, res)});
}).post(function(req, res, next){ // CREATE NODES
    var entity;
    entity = EntityModel.create({
        title: req.query.title,
        details: req.query.details,
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
    return EntityModel.findById(req.params.id, function(err, entity){dataHandler(err, entity, res)});
}).put(function(req, res, next){ // UPDATE SPECIFIC NODES
    return EntityModel.findById(req.params.id, function(err, entity){
        entity.title = req.query.title;
        entity.details = req.query.details;
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
router.delete('/nodes/destroy/all', function (req, res, next){ // Bulk destroy all FROM DB -- VERY DANGER --
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