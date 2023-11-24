// Install `npm install --save-dev mocha chai supertest` to run the tests

// mocha is for running the tests
// chai is for assertions
// supertest is for making requests


const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

require("dotenv").config()

const API_KEY = process.env.API_KEY;

const app = require('../app');

describe("GET /", () => {
    it("Should return Hello World", (done) => {
        supertest(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.contain('Hello World');
                done();
            });
    });

});

describe("POST /user", () => {
    it("Should return Successful", (done) => {
        supertest(app)
            .post('/user')
            .send({name: 'John Doe'})
            .set('x-api-key', API_KEY)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal('Successful');
                done();
            });
    });
    it("Should return 401 if no API key is provided", (done) => {
        supertest(app)
            .post('/user')
            .send({"name": "Name Test"})
            .expect(401)
            .end((err, res) => {
                if (err) return (err);
                expect(res.text).to.equal("Invalid API Key");
                done();
            })
    });
});
