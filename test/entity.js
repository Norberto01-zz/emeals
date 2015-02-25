var request = require('supertest'),
    express = require('express'),
    should = require('should');
var app = require('../app');

//describe('POST', function(){
//    it('responds ENTITY JSON', function(done){
//        var user = {
//            name: "Hola", details:"Mundo Lorem Ipsum", status:true
//        };
//        request(app)
//            .post('/entity/nodes')
//            .send(user)
//            .expect('Content-Type', 'application/json; charset=utf-8')
//            .expect(200, done);
//    });
//});


//describe('Get', function() {
//    it("renders successfully", function(done) {
//        request(app)
//            .get('/entity/nodes')
//            .expect(200, done);
//    });
//});