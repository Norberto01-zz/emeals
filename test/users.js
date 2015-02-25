var request = require('supertest'),
    express = require('express'),
    should = require('should');
var app = require('../app');

describe('POST', function() {
    it('responds with a USER json success message', function(done){
        var user = {
            "entity_sch":[{
                "name": "Hola",
                "details": "Mundo Lorem Ipsum",
                "status": true
            }],
            "last_name": "mies",
            "username": "joaquin",
            "password": "1234567",
            "email": "norbertoortiz@gmail.com",
            "phone": "4561237859"
        };
        request(app)
            .post("/user/nodes")
            .send({
                "entity_sch":[{
                    "name": "Hola",
                    "details": "Mundo Lorem Ipsum",
                    "status": true
                }],
                "last_name": "mies",
                "username": "Gabriel",
                "password": "1234567",
                "email": "norbertoortiz@gmail.com",
                "phone": "4561237859"
            })
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});


describe('Get', function() {
    it("renders successfully", function(done) {
        request(app)
            .get('/user/nodes')
            .expect(200, done);
    });
});

describe('Get', function() {
    it("Get View USER successfully", function(done) {
        request(app)
            .get('/user/nodes/54eb6a59d9a9863428a1ed14')
            .expect(200, done);
    });
});