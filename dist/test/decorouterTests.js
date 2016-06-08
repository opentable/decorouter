'use strict';

var _decorouter = require('../decorouter');

var _testControllers = require('./testControllers');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _chai = require('chai');

var chai = _interopRequireWildcard(_chai);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let expect = chai.expect;
chai.config.includeStack = true;

describe('Express class method route decorator tests', () => {

    function mockReq(route) {
        var i = 0;
        var sent = {};
        var err = null;
        let req = {},
            res = { send: data => sent = data };

        var deferred = Promise.defer();

        let next = error => {
            if (!err) err = error;
            if (i >= route.stack.length) {
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
        let router = _express2.default.Router();

        (0, _decorouter.addRoutes)(router, () => new _testControllers.Controller());
        let layer = router.stack.find(layer => {
            return layer.route.path === '/method';
        });
        expect(layer).to.be.ok;
        return mockReq(layer.route).then(res => {
            let [sent] = res;
            expect(sent.from).to.be.equal('method');
        });
    });

    it('should map async/promise method and wrap with call to next', () => {
        let router = _express2.default.Router();

        (0, _decorouter.addRoutes)(router, () => new _testControllers.Controller());
        let layer = router.stack.find(layer => {
            return layer.route.path === '/methodAsync';
        });
        expect(layer).to.be.ok;
        return mockReq(layer.route).then(res => {
            let [sent] = res;
            expect(sent.from).to.be.equal('methodAsync');
        });
    });

    it('should allow passing extra handlers to route', () => {
        let router = _express2.default.Router();

        (0, _decorouter.addRoutes)(router, () => new _testControllers.Controller());
        let layer = router.stack.find(layer => {
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
        let router = _express2.default.Router();

        (0, _decorouter.addRoutes)(router, () => new _testControllers.Controller());
        let layer = router.stack.find(layer => {
            return layer.route.path === '/methodWithoutDecorator';
        });
        expect(layer).to.be.ok;
        return mockReq(layer.route).then(res => {
            let [sent] = res;
            expect(sent.from).to.be.equal('methodWithoutDecorator');
        });
    });

    it('should by default create a route with the name of the method', () => {
        let router = _express2.default.Router();

        (0, _decorouter.addRoutes)(router, () => new _testControllers.Controller());
        let layer = router.stack.find(layer => {
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
        let router = _express2.default.Router();

        //console.log(plainHandler);
        (0, _decorouter.addRoutes)(router, () => _testControllers.plainHandler);
        let layer = router.stack.find(layer => {
            return layer.route.path === '/plainHandler';
        });
        expect(layer).to.be.ok;
        return mockReq(layer.route).then(res => {
            let [sent] = res;
            expect(sent.from).to.be.equal('plainHandler');
        });
    });

    it('should call next passing error in case of exception in handler', () => {
        let router = _express2.default.Router();

        (0, _decorouter.addRoutes)(router, () => new _testControllers.Controller());
        let layer = router.stack.find(layer => {
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
        let router = _express2.default.Router();

        (0, _decorouter.addRoutes)(router, () => new _testControllers.Controller());
        let layer = router.stack.find(layer => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2RlY29yb3V0ZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0lBQVksSTs7Ozs7O0FBRVosSUFBSSxTQUFTLEtBQUssTUFBbEI7QUFDQSxLQUFLLE1BQUwsQ0FBWSxZQUFaLEdBQTJCLElBQTNCOztBQUVBLFNBQVMsNENBQVQsRUFBdUQsTUFBTTs7QUFFekQsYUFBUyxPQUFULENBQWlCLEtBQWpCLEVBQXdCO0FBQ3BCLFlBQUksSUFBSSxDQUFSO0FBQ0EsWUFBSSxPQUFPLEVBQVg7QUFDQSxZQUFJLE1BQU0sSUFBVjtBQUNBLFlBQUksTUFBTSxFQUFWO1lBQWMsTUFBTSxFQUFFLE1BQU8sSUFBRCxJQUFVLE9BQU8sSUFBekIsRUFBcEI7O0FBRUEsWUFBSSxXQUFXLFFBQVEsS0FBUixFQUFmOztBQUVBLFlBQUksT0FBUSxLQUFELElBQVc7QUFDbEIsZ0JBQUcsQ0FBQyxHQUFKLEVBQVMsTUFBTSxLQUFOO0FBQ1QsZ0JBQUcsS0FBSyxNQUFNLEtBQU4sQ0FBWSxNQUFwQixFQUEyQjtBQUN2Qix5QkFBUyxPQUFULENBQWlCLENBQUMsSUFBRCxFQUFPLEdBQVAsQ0FBakI7QUFDQTtBQUNIO0FBQ0QsZ0JBQUksT0FBTyxNQUFNLEtBQU4sQ0FBWSxHQUFaLENBQVg7QUFDQSxpQkFBSyxNQUFMLENBQVksR0FBWixFQUFpQixHQUFqQixFQUFzQixJQUF0QjtBQUNILFNBUkQ7O0FBVUE7QUFDQSxlQUFPLFNBQVMsT0FBaEI7QUFDSDs7QUFFRCxPQUFHLDhDQUFILEVBQW1ELE1BQU07QUFDckQsWUFBSSxTQUFTLGtCQUFRLE1BQVIsRUFBYjs7QUFFQSxtQ0FBVSxNQUFWLEVBQWtCLE1BQU0saUNBQXhCO0FBQ0EsWUFBSSxRQUFRLE9BQU8sS0FBUCxDQUFhLElBQWIsQ0FBbUIsS0FBRCxJQUFXO0FBQ3JDLG1CQUFPLE1BQU0sS0FBTixDQUFZLElBQVosS0FBcUIsU0FBNUI7QUFD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O0FBQ0EsZUFBTyxRQUFRLE1BQU0sS0FBZCxFQUFxQixJQUFyQixDQUEwQixPQUFPO0FBQ3BDLGdCQUFJLENBQUMsSUFBRCxFQUFPLEdBQVAsSUFBYyxHQUFsQjtBQUNBLG1CQUFPLEtBQUssSUFBWixFQUFrQixFQUFsQixDQUFxQixFQUFyQixDQUF3QixLQUF4QixDQUE4QixjQUE5QjtBQUNBLG1CQUFPLElBQUksT0FBWCxFQUFvQixFQUFwQixDQUF1QixFQUF2QixDQUEwQixLQUExQixDQUFnQyxrQkFBaEM7QUFDSCxTQUpNLENBQVA7QUFLSCxLQWJEOztBQWVBLE9BQUcsc0VBQUgsRUFBMkUsTUFBTTtBQUM3RSxZQUFJLFNBQVMsa0JBQVEsTUFBUixFQUFiOztBQUVBLG1DQUFVLE1BQVYsRUFBa0IsTUFBTSxpQ0FBeEI7QUFDQSxZQUFJLFFBQVEsT0FBTyxLQUFQLENBQWEsSUFBYixDQUFtQixLQUFELElBQVc7QUFDckMsbUJBQU8sTUFBTSxLQUFOLENBQVksSUFBWixLQUFxQixvQkFBNUI7QUFDSCxTQUZXLENBQVo7QUFHQSxlQUFPLEtBQVAsRUFBYyxFQUFkLENBQWlCLEVBQWpCLENBQW9CLEVBQXBCO0FBQ0EsZUFBTyxRQUFRLE1BQU0sS0FBZCxFQUFxQixJQUFyQixDQUEwQixPQUFPO0FBQ3BDLGdCQUFJLENBQUMsSUFBRCxFQUFPLEdBQVAsSUFBYyxHQUFsQjtBQUNBLG1CQUFPLEtBQUssSUFBWixFQUFrQixFQUFsQixDQUFxQixFQUFyQixDQUF3QixLQUF4QixDQUE4QixtQkFBOUI7QUFDQSxtQkFBTyxJQUFJLE9BQVgsRUFBb0IsRUFBcEIsQ0FBdUIsRUFBdkIsQ0FBMEIsS0FBMUIsQ0FBZ0Msa0JBQWhDO0FBQ0gsU0FKTSxDQUFQO0FBTUgsS0FkRDtBQWdCSCxDQTlJRCIsImZpbGUiOiJkZWNvcm91dGVyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FkZFJvdXRlcywgYWRkUm91dGVzRnJvbURpciB9IGZyb20gJy4uL2RlY29yb3V0ZXInO1xuaW1wb3J0IHsgQ29udHJvbGxlciwgcGxhaW5IYW5kbGVyIH0gZnJvbSAnLi90ZXN0Q29udHJvbGxlcnMnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBjaGFpIGZyb20gJ2NoYWknO1xuXG5sZXQgZXhwZWN0ID0gY2hhaS5leHBlY3Q7XG5jaGFpLmNvbmZpZy5pbmNsdWRlU3RhY2sgPSB0cnVlO1xuXG5kZXNjcmliZSgnRXhwcmVzcyBjbGFzcyBtZXRob2Qgcm91dGUgZGVjb3JhdG9yIHRlc3RzJywgKCkgPT4ge1xuICAgIFxuICAgIGZ1bmN0aW9uIG1vY2tSZXEocm91dGUpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgc2VudCA9IHt9O1xuICAgICAgICB2YXIgZXJyID0gbnVsbDtcbiAgICAgICAgbGV0IHJlcSA9IHt9LCByZXMgPSB7IHNlbmQ6IChkYXRhKSA9PiBzZW50ID0gZGF0YX07XG4gICAgICAgIFxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBQcm9taXNlLmRlZmVyKCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgbmV4dCA9IChlcnJvcikgPT4geyAgICBcbiAgICAgICAgICAgIGlmKCFlcnIpIGVyciA9IGVycm9yO1xuICAgICAgICAgICAgaWYoaSA+PSByb3V0ZS5zdGFjay5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoW3NlbnQsIGVycl0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBjdXJyID0gcm91dGUuc3RhY2tbaSsrXTsgICAgICAgIFxuICAgICAgICAgICAgY3Vyci5oYW5kbGUocmVxLCByZXMsIG5leHQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIG5leHQoKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfVxuICAgIFxuICAgIGl0KCdzaG91bGQgbWFwIHBsYWluIHJvdXRlIHRvIHBsYWluIGNsYXNzIG1ldGhvZCcsICgpID0+IHtcbiAgICAgICAgbGV0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgYWRkUm91dGVzKHJvdXRlciwgKCkgPT4gbmV3IENvbnRyb2xsZXIoKSk7XG4gICAgICAgIGxldCBsYXllciA9IHJvdXRlci5zdGFjay5maW5kKChsYXllcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGxheWVyLnJvdXRlLnBhdGggPT09ICcvbWV0aG9kJztcbiAgICAgICAgfSk7ICAgICAgICBcbiAgICAgICAgZXhwZWN0KGxheWVyKS50by5iZS5vaztcbiAgICAgICAgcmV0dXJuIG1vY2tSZXEobGF5ZXIucm91dGUpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIGxldCBbc2VudF0gPSByZXM7XG4gICAgICAgICAgICBleHBlY3Qoc2VudC5mcm9tKS50by5iZS5lcXVhbCgnbWV0aG9kJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIGl0KCdzaG91bGQgbWFwIGFzeW5jL3Byb21pc2UgbWV0aG9kIGFuZCB3cmFwIHdpdGggY2FsbCB0byBuZXh0JywgKCkgPT4ge1xuICAgICAgICBsZXQgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcbiAgICAgICAgICAgIFxuICAgICAgICBhZGRSb3V0ZXMocm91dGVyLCAoKSA9PiBuZXcgQ29udHJvbGxlcigpKTtcbiAgICAgICAgbGV0IGxheWVyID0gcm91dGVyLnN0YWNrLmZpbmQoKGxheWVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbGF5ZXIucm91dGUucGF0aCA9PT0gJy9tZXRob2RBc3luYyc7XG4gICAgICAgIH0pOyAgICAgICAgXG4gICAgICAgIGV4cGVjdChsYXllcikudG8uYmUub2s7XG4gICAgICAgIHJldHVybiBtb2NrUmVxKGxheWVyLnJvdXRlKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBsZXQgW3NlbnRdID0gcmVzO1xuICAgICAgICAgICAgZXhwZWN0KHNlbnQuZnJvbSkudG8uYmUuZXF1YWwoJ21ldGhvZEFzeW5jJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIGl0KCdzaG91bGQgYWxsb3cgcGFzc2luZyBleHRyYSBoYW5kbGVycyB0byByb3V0ZScsICgpID0+IHtcbiAgICAgICAgbGV0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgYWRkUm91dGVzKHJvdXRlciwgKCkgPT4gbmV3IENvbnRyb2xsZXIoKSk7XG4gICAgICAgIGxldCBsYXllciA9IHJvdXRlci5zdGFjay5maW5kKChsYXllcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGxheWVyLnJvdXRlLnBhdGggPT09ICcvbWV0aG9kV2l0aEFkZGl0aW9uYWxIYW5kbGVyJztcbiAgICAgICAgfSk7ICAgICAgICBcbiAgICAgICAgZXhwZWN0KGxheWVyKS50by5iZS5vaztcbiAgICAgICAgcmV0dXJuIG1vY2tSZXEobGF5ZXIucm91dGUpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIGxldCBbc2VudF0gPSByZXM7XG4gICAgICAgICAgICBleHBlY3Qoc2VudC5mcm9tKS50by5iZS5lcXVhbCgnbWV0aG9kV2l0aEFkZGl0aW9uYWxIYW5kbGVyJyk7XG4gICAgICAgICAgICBleHBlY3Qoc2VudC5oYW5kbGVyQ2FsbGVkKS50by5iZS5lcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgaXQoJ3Nob3VsZCBtYXAgcm91dGUgZGVjbGFyZWQgaW4gY29udHJ1Y3RvciB3aXRob3V0IGRlY29yYXRvcicsICgpID0+IHtcbiAgICAgICAgbGV0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgYWRkUm91dGVzKHJvdXRlciwgKCkgPT4gbmV3IENvbnRyb2xsZXIoKSk7XG4gICAgICAgIGxldCBsYXllciA9IHJvdXRlci5zdGFjay5maW5kKChsYXllcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGxheWVyLnJvdXRlLnBhdGggPT09ICcvbWV0aG9kV2l0aG91dERlY29yYXRvcic7XG4gICAgICAgIH0pOyAgICAgICAgXG4gICAgICAgIGV4cGVjdChsYXllcikudG8uYmUub2s7XG4gICAgICAgIHJldHVybiBtb2NrUmVxKGxheWVyLnJvdXRlKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBsZXQgW3NlbnRdID0gcmVzO1xuICAgICAgICAgICAgZXhwZWN0KHNlbnQuZnJvbSkudG8uYmUuZXF1YWwoJ21ldGhvZFdpdGhvdXREZWNvcmF0b3InKTsgICAgXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIGl0KCdzaG91bGQgYnkgZGVmYXVsdCBjcmVhdGUgYSByb3V0ZSB3aXRoIHRoZSBuYW1lIG9mIHRoZSBtZXRob2QnLCAoKSA9PiB7XG4gICAgICAgIGxldCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuICAgICAgICAgICAgXG4gICAgICAgIGFkZFJvdXRlcyhyb3V0ZXIsICgpID0+IG5ldyBDb250cm9sbGVyKCkpO1xuICAgICAgICBsZXQgbGF5ZXIgPSByb3V0ZXIuc3RhY2suZmluZCgobGF5ZXIpID0+IHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobGF5ZXIucm91dGUucGF0aCk7XG4gICAgICAgICAgICByZXR1cm4gbGF5ZXIucm91dGUucGF0aCA9PT0gJy9Db250cm9sbGVyL2RlZmF1bHRSb3V0ZUFzc2lnbmVkQnlNZXRob2ROYW1lJztcbiAgICAgICAgfSk7ICAgICAgICBcbiAgICAgICAgZXhwZWN0KGxheWVyKS50by5iZS5vaztcbiAgICAgICAgcmV0dXJuIG1vY2tSZXEobGF5ZXIucm91dGUpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIGxldCBbc2VudF0gPSByZXM7XG4gICAgICAgICAgICBleHBlY3Qoc2VudC5mcm9tKS50by5iZS5lcXVhbCgnZGVmYXVsdFJvdXRlQXNzaWduZWRCeU1ldGhvZE5hbWUnKTsgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIGl0KCdzaG91bGQgbWFwIHBsYWluIGZ1bmN0aW9uIHJvdXRlIGhhbmRsZXInLCAoKSA9PiB7XG4gICAgICAgIGxldCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuICAgICAgICAgICAgXG4gICAgICAgIC8vY29uc29sZS5sb2cocGxhaW5IYW5kbGVyKTtcbiAgICAgICAgYWRkUm91dGVzKHJvdXRlciwgKCkgPT4gcGxhaW5IYW5kbGVyKTtcbiAgICAgICAgbGV0IGxheWVyID0gcm91dGVyLnN0YWNrLmZpbmQoKGxheWVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbGF5ZXIucm91dGUucGF0aCA9PT0gJy9wbGFpbkhhbmRsZXInO1xuICAgICAgICB9KTsgICAgICAgIFxuICAgICAgICBleHBlY3QobGF5ZXIpLnRvLmJlLm9rO1xuICAgICAgICByZXR1cm4gbW9ja1JlcShsYXllci5yb3V0ZSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgbGV0IFtzZW50XSA9IHJlcztcbiAgICAgICAgICAgIGV4cGVjdChzZW50LmZyb20pLnRvLmJlLmVxdWFsKCdwbGFpbkhhbmRsZXInKTsgICAgICBcbiAgICAgICAgfSk7IFxuICAgIH0pO1xuICAgIFxuICAgIGl0KCdzaG91bGQgY2FsbCBuZXh0IHBhc3NpbmcgZXJyb3IgaW4gY2FzZSBvZiBleGNlcHRpb24gaW4gaGFuZGxlcicsICgpID0+IHtcbiAgICAgICAgbGV0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgYWRkUm91dGVzKHJvdXRlciwgKCkgPT4gbmV3IENvbnRyb2xsZXIoKSk7XG4gICAgICAgIGxldCBsYXllciA9IHJvdXRlci5zdGFjay5maW5kKChsYXllcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGxheWVyLnJvdXRlLnBhdGggPT09ICcvbWV0aG9kVGhyb3dzJztcbiAgICAgICAgfSk7ICAgICAgICBcbiAgICAgICAgZXhwZWN0KGxheWVyKS50by5iZS5vaztcbiAgICAgICAgcmV0dXJuIG1vY2tSZXEobGF5ZXIucm91dGUpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIGxldCBbc2VudCwgZXJyXSA9IHJlcztcbiAgICAgICAgICAgIGV4cGVjdChzZW50LmZyb20pLnRvLmJlLmVxdWFsKCdtZXRob2RUaHJvd3MnKTtcbiAgICAgICAgICAgIGV4cGVjdChlcnIubWVzc2FnZSkudG8uYmUuZXF1YWwoJ3RoaXMgaXMgYW4gZXJyb3InKTsgIFxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbiAgICBpdCgnc2hvdWxkIGNhbGwgbmV4dCBwYXNzaW5nIGVycm9yIGluIGNhc2Ugb2YgZXhjZXB0aW9uIGluIGFzeW5jIGhhbmRsZXInLCAoKSA9PiB7XG4gICAgICAgIGxldCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuICAgICAgICAgICAgXG4gICAgICAgIGFkZFJvdXRlcyhyb3V0ZXIsICgpID0+IG5ldyBDb250cm9sbGVyKCkpO1xuICAgICAgICBsZXQgbGF5ZXIgPSByb3V0ZXIuc3RhY2suZmluZCgobGF5ZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBsYXllci5yb3V0ZS5wYXRoID09PSAnL21ldGhvZFRocm93c0FzeW5jJztcbiAgICAgICAgfSk7ICAgICAgICBcbiAgICAgICAgZXhwZWN0KGxheWVyKS50by5iZS5vaztcbiAgICAgICAgcmV0dXJuIG1vY2tSZXEobGF5ZXIucm91dGUpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIGxldCBbc2VudCwgZXJyXSA9IHJlcztcbiAgICAgICAgICAgIGV4cGVjdChzZW50LmZyb20pLnRvLmJlLmVxdWFsKCdtZXRob2RUaHJvd3NBc3luYycpO1xuICAgICAgICAgICAgZXhwZWN0KGVyci5tZXNzYWdlKS50by5iZS5lcXVhbCgndGhpcyBpcyBhbiBlcnJvcicpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuICAgIFxufSk7Il19