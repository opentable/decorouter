import {addRoutes, addRoutesFromDir } from '../decorouter';
import { Controller, plainHandler } from './testControllers';
import express from 'express';
import * as chai from 'chai';
import request from 'supertest';

let expect = chai.expect;
chai.config.includeStack = true;

describe('Express class method route decorator tests', () => {
    
    let app = express();
    let server = null;

    before((done) => {
        let router = express.Router();
        addRoutes(router, () => new Controller());
        addRoutes(router, () => plainHandler);
        app.use('/', router);
        server = app.listen(3131, () => {
            done();
            console.log('starting');
        });     
    });
    after((done) => {
        server.close();
        console.log('finish');
        done();
    });

    it('should map plain route to plain class method', (done) => {
    
        request(server)
        .get('/method')
        .expect(200, {
            from: 'method'
        }, done);
    });

    it('should map async/promise method and wrap with call to next', (done) => {
        
        request(server)
        .get('/methodAsync')
        .expect(200, {
            from: 'methodAsync'
        }, done);
    });

    it('should allow passing extra handlers to route', (done) => {
        
        request(server)
        .get('/methodWithAdditionalHandler')
        .expect(200, {
            from: 'methodWithAdditionalHandler',
            handlerCalled: true
        }, done);
    });

    it('should map route declared in contructor without decorator', (done) => {
        
        request(server)
        .get('/methodWithoutDecorator')
        .expect(200, {
            from: 'methodWithoutDecorator'
        }, done);
    });

    it('should by default create a route with the name of the method', (done) => {
        
        request(server)
        .get('/Controller/defaultRouteAssignedByMethodName')
        .expect(200, {
            from: 'defaultRouteAssignedByMethodName'
        }, done);
    });

    it('should map plain function route handler', (done) => {
        
        request(server)
        .get('/plainHandler')
        .expect(200, {
            from: 'plainHandler'
        }, done);
    });

    it('should call next passing error in case of exception in handler', (done) => {
        
        request(server)
        .get('/methodThrows')
        .expect(500, done);
    });

    it('should call next passing error in case of exception in async handler', (done) => {
        
        request(server)
        .get('/methodThrowsAsync')
        .expect(500, done);       
    });

    it('should deal with route handlers that specify next', (done) => {
        
        request(server)
        .get('/methodWithNext')
        .expect(200, {
            from: 'methodWithNext'
        }, done);
    });
});
