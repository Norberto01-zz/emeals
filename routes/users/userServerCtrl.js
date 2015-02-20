var express = require('express');
var router = express.Router();
var models = require('../../models');

objectId = require('mongodb').ObjectID;


var dataHandler = function (err, param, res){
    if(!err){
        return res.send(param);
    }else{
        return console.log(err);
    }
};

router.route('/nodes').get(function(req, res){ // LIST NODES
    return models.UserSchema.find(function(err, entity){dataHandler(err, entity, res)});
}).post(function(req, res, next){ // CREATE NODES
    //console.log(req.query);

    var params = {name:req.param('name'), details:req.param('details'), status:req.param('status')};

    var entity = models.UserSchema.create({
        parent:{name: req.param('name'), details: req.query.details, status: req.query.status},
        last_name: req.param('last_name'),
        username: req.param('username'),
        password: req.param('password'),
        email: req.param('email'),
        phone: req.param('phone')
    });
    entity.addParent(params);
    //var examp =
    //console.log(examp);
    entity.save(function(err){
        if(!err){
            return console.log("Child Created");
        } else {
            console.log("Child Server ERROR");
            return console.log(err);
        }
    });

    return res.send(entity);
});
router.route('/nodes/:id').get(function(req, res, next){ // VIEW SPECIFIC NODES
    return models.UserSchema.findById(req.params.id, function(err, entity){dataHandler(err, entity, res)});
}).put(function(req, res, next){ // UPDATE SPECIFIC NODES
    return models.UserSchema.findById(req.params.id, function(err, entity){
        console.log(entity);
        console.log(req.query);
        entity.last_name = req.query.last_name;
        entity.username = req.query.username;
        entity.password = req.query.password;
        entity.email = req.query.email;
        entity.phone = req.query.phone;

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
    return models.UserSchema.findById(req.params.id, function(err, entity){
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
    return models.UserSchema.findById(req.params.id, function(err, entity){
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
    models.UserSchema.remove(function (err) {
        if (!err) {
            console.log("All has been deleted :(");
            return res.send('');
        } else {
            console.log(err);
        }
    });
});

module.exports = router;