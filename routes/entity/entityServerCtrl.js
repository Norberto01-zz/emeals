var express = require('express');
var router = express.Router();
var models = require('../../models');

objectId = require('mongodb').ObjectID;


//var data = models.dbconnection(),
//    EntityModel = data.EntitiesModel;


var dataHandler = function (err, param, res){
    if(!err){
        return res.send(param);
    }else{
        return console.log(err);
    }
};

router.route('/nodes').get(function(req, res){ // LIST NODES
    return models.EntitySchema.find(function(err, entityschemas){dataHandler(err, entityschemas, res)});
}).post(function(req, res, next){ // CREATE NODES
    var entity;
    entity = models.EntitySchema.create({
        name: req.query.name,
        details: req.query.details,
        status: true,
        created: Date.now(),
        removed: false
    });

    //entity.entity_sch[0].name = req.

    entity.save(function(err){
        if(!err){
            return console.log("Created NODE!!!");
        } else {
            return console.log(err);
        }
    });
    return res.send(entity);
});
router.route('/nodes/:id').get(function(req, res, next){ // VIEW SPECIFIC NODES
    return models.EntitySchema.findById(req.params.id, function(err, entity){dataHandler(err, entity, res)});
}).put(function(req, res, next){ // UPDATE SPECIFIC NODES
    return models.EntitySchema.findById(req.params.id, function(err, entity){
        entity.name = req.query.name;
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
    return req.db.EntitySchema.findById(req.params.id, function(err, entity){
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
    return req.db.EntitySchema.findById(req.params.id, function(err, entity){
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
    req.db.EntitySchema.remove(function (err) {
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