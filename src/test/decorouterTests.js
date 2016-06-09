import {addRoutes, addRoutesFromDir } from '../decorouter';
import { Controller, plainHandler } from './testControllers';
import express from 'express';
import * as chai from 'chai';

let expect = chai.expect;
chai.config.includeStack = true;

describe('Express class method route decorator tests', () => {

    function mockReq(route) {
        var i = 0;
        var sent = {};
        var err = null;
        let req = {}, res = { send: (data) => sent = data};

        var deferred = Promise.defer();
        
        let next = (error) => {
            if(!err) err = error;
            if(i >= route.stack.length) {
                deferred.resolve([sent, err]);
                return;
            }
            let curr = route.stack[i++];
            curr.handle(req, res, next);
        };

        next();
        return deferred.promise;
    }

    it('should map plain route to plain class method', () => {
        let router = express.Router();

        addRoutes(router, () => new Controller());
        let layer = router.stack.find((layer) => {
            return layer.route.path === '/method';
        });
        expect(layer).to.be.ok;
        return mockReq(layer.route).then(res => {
            let [sent] = res;
            expect(sent.from).to.be.equal('method');
        });
    });

    it('should map async/promise method and wrap with call to next', () => {
        let router = express.Router();

        addRoutes(router, () => new Controller());
        let layer = router.stack.find((layer) => {
            return layer.route.path === '/methodAsync';
        });
        expect(layer).to.be.ok;
        return mockReq(layer.route).then(res => {
            let [sent] = res;
            expect(sent.from).to.be.equal('methodAsync');
        });
    });

    it('should allow passing extra handlers to route', () => {
        let router = express.Router();

        addRoutes(router, () => new Controller());
        let layer = router.stack.find((layer) => {
            return layer.route.path === '/methodWithAdditionalHandler';
        });
        expect(layer).to.be.ok;
        return mockReq(layer.route).then(res => {
            let [sent] = res;
            expect(sent.from).to.be.equal('methodWithAdditionalHandler');
            expect(sent.handlerCalled).to.be.equal(true);
        });
    });

    it('should map route declared in contructor without decorator', () => {
        let router = express.Router();

        addRoutes(router, () => new Controller());
        let layer = router.stack.find((layer) => {
            return layer.route.path === '/methodWithoutDecorator';
        });
        expect(layer).to.be.ok;
        return mockReq(layer.route).then(res => {
            let [sent] = res;
            expect(sent.from).to.be.equal('methodWithoutDecorator');
        });
    });

    it('should by default create a route with the name of the method', () => {
        let router = express.Router();

        addRoutes(router, () => new Controller());
        let layer = router.stack.find((layer) => {
            //console.log(layer.route.path);
            return layer.route.path === '/Controller/defaultRouteAssignedByMethodName';
        });
        expect(layer).to.be.ok;
        return mockReq(layer.route).then(res => {
            let [sent] = res;
            expect(sent.from).to.be.equal('defaultRouteAssignedByMethodName');
        });
    });

    it('should map plain function route handler', () => {
        let router = express.Router();

        //console.log(plainHandler);
        addRoutes(router, () => plainHandler);
        let layer = router.stack.find((layer) => {
            return layer.route.path === '/plainHandler';
        });
        expect(layer).to.be.ok;
        return mockReq(layer.route).then(res => {
            let [sent] = res;
            expect(sent.from).to.be.equal('plainHandler');
        });
    });

    it('should call next passing error in case of exception in handler', () => {
        let router = express.Router();

        addRoutes(router, () => new Controller());
        let layer = router.stack.find((layer) => {
            return layer.route.path === '/methodThrows';
        });
        expect(layer).to.be.ok;
        return mockReq(layer.route).then(res => {
            let [sent, err] = res;
            expect(sent.from).to.be.equal('methodThrows');
            expect(err.message).to.be.equal('this is an error');
        });
    });

    it('should call next passing error in case of exception in async handler', () => {
        let router = express.Router();

        addRoutes(router, () => new Controller());
        let layer = router.stack.find((layer) => {
            return layer.route.path === '/methodThrowsAsync';
        });
        expect(layer).to.be.ok;
        return mockReq(layer.route).then(res => {
            let [sent, err] = res;
            expect(sent.from).to.be.equal('methodThrowsAsync');
            expect(err.message).to.be.equal('this is an error');
        });

    });

});
