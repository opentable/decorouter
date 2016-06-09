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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2RlY29yb3V0ZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0lBQVksSTs7Ozs7O0FBRVosSUFBSSxTQUFTLEtBQUssTUFBbEI7QUFDQSxLQUFLLE1BQUwsQ0FBWSxZQUFaLEdBQTJCLElBQTNCOztBQUVBLFNBQVMsNENBQVQsRUFBdUQsTUFBTTs7QUFFekQsYUFBUyxPQUFULENBQWlCLEtBQWpCLEVBQXdCO0FBQ3BCLFlBQUksSUFBSSxDQUFSO0FBQ0EsWUFBSSxPQUFPLEVBQVg7QUFDQSxZQUFJLE1BQU0sSUFBVjtBQUNBLFlBQUksTUFBTSxFQUFWO1lBQWMsTUFBTSxFQUFFLE1BQU8sSUFBRCxJQUFVLE9BQU8sSUFBekIsRUFBcEI7O0FBRUEsWUFBSSxXQUFXLFFBQVEsS0FBUixFQUFmOztBQUVBLFlBQUksT0FBUSxLQUFELElBQVc7QUFDbEIsZ0JBQUcsQ0FBQyxHQUFKLEVBQVMsTUFBTSxLQUFOO0FBQ1QsZ0JBQUcsS0FBSyxNQUFNLEtBQU4sQ0FBWSxNQUFwQixFQUE0QjtBQUN4Qix5QkFBUyxPQUFULENBQWlCLENBQUMsSUFBRCxFQUFPLEdBQVAsQ0FBakI7QUFDQTtBQUNIO0FBQ0QsZ0JBQUksT0FBTyxNQUFNLEtBQU4sQ0FBWSxHQUFaLENBQVg7QUFDQSxpQkFBSyxNQUFMLENBQVksR0FBWixFQUFpQixHQUFqQixFQUFzQixJQUF0QjtBQUNILFNBUkQ7O0FBVUE7QUFDQSxlQUFPLFNBQVMsT0FBaEI7QUFDSDs7QUFFRCxPQUFHLDhDQUFILEVBQW1ELE1BQU07QUFDckQsWUFBSSxTQUFTLGtCQUFRLE1BQVIsRUFBYjs7QUFFQSxtQ0FBVSxNQUFWLEVBQWtCLE1BQU0saUNBQXhCO0FBQ0EsWUFBSSxRQUFRLE9BQU8sS0FBUCxDQUFhLElBQWIsQ0FBbUIsS0FBRCxJQUFXO0FBQ3JDLG1CQUFPLE1BQU0sS0FBTixDQUFZLElBQVosS0FBcUIsU0FBNUI7QUFD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O0FBQ0EsZUFBTyxRQUFRLE1BQU0sS0FBZCxFQUFxQixJQUFyQixDQUEwQixPQUFPO0FBQ3BDLGdCQUFJLENBQUMsSUFBRCxFQUFPLEdBQVAsSUFBYyxHQUFsQjtBQUNBLG1CQUFPLEtBQUssSUFBWixFQUFrQixFQUFsQixDQUFxQixFQUFyQixDQUF3QixLQUF4QixDQUE4QixjQUE5QjtBQUNBLG1CQUFPLElBQUksT0FBWCxFQUFvQixFQUFwQixDQUF1QixFQUF2QixDQUEwQixLQUExQixDQUFnQyxrQkFBaEM7QUFDSCxTQUpNLENBQVA7QUFLSCxLQWJEOztBQWVBLE9BQUcsc0VBQUgsRUFBMkUsTUFBTTtBQUM3RSxZQUFJLFNBQVMsa0JBQVEsTUFBUixFQUFiOztBQUVBLG1DQUFVLE1BQVYsRUFBa0IsTUFBTSxpQ0FBeEI7QUFDQSxZQUFJLFFBQVEsT0FBTyxLQUFQLENBQWEsSUFBYixDQUFtQixLQUFELElBQVc7QUFDckMsbUJBQU8sTUFBTSxLQUFOLENBQVksSUFBWixLQUFxQixvQkFBNUI7QUFDSCxTQUZXLENBQVo7QUFHQSxlQUFPLEtBQVAsRUFBYyxFQUFkLENBQWlCLEVBQWpCLENBQW9CLEVBQXBCO0FBQ0EsZUFBTyxRQUFRLE1BQU0sS0FBZCxFQUFxQixJQUFyQixDQUEwQixPQUFPO0FBQ3BDLGdCQUFJLENBQUMsSUFBRCxFQUFPLEdBQVAsSUFBYyxHQUFsQjtBQUNBLG1CQUFPLEtBQUssSUFBWixFQUFrQixFQUFsQixDQUFxQixFQUFyQixDQUF3QixLQUF4QixDQUE4QixtQkFBOUI7QUFDQSxtQkFBTyxJQUFJLE9BQVgsRUFBb0IsRUFBcEIsQ0FBdUIsRUFBdkIsQ0FBMEIsS0FBMUIsQ0FBZ0Msa0JBQWhDO0FBQ0gsU0FKTSxDQUFQO0FBTUgsS0FkRDtBQWdCSCxDQTlJRCIsImZpbGUiOiJkZWNvcm91dGVyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FkZFJvdXRlcywgYWRkUm91dGVzRnJvbURpciB9IGZyb20gJy4uL2RlY29yb3V0ZXInO1xuaW1wb3J0IHsgQ29udHJvbGxlciwgcGxhaW5IYW5kbGVyIH0gZnJvbSAnLi90ZXN0Q29udHJvbGxlcnMnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBjaGFpIGZyb20gJ2NoYWknO1xuXG5sZXQgZXhwZWN0ID0gY2hhaS5leHBlY3Q7XG5jaGFpLmNvbmZpZy5pbmNsdWRlU3RhY2sgPSB0cnVlO1xuXG5kZXNjcmliZSgnRXhwcmVzcyBjbGFzcyBtZXRob2Qgcm91dGUgZGVjb3JhdG9yIHRlc3RzJywgKCkgPT4ge1xuXG4gICAgZnVuY3Rpb24gbW9ja1JlcShyb3V0ZSkge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBzZW50ID0ge307XG4gICAgICAgIHZhciBlcnIgPSBudWxsO1xuICAgICAgICBsZXQgcmVxID0ge30sIHJlcyA9IHsgc2VuZDogKGRhdGEpID0+IHNlbnQgPSBkYXRhfTtcblxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBQcm9taXNlLmRlZmVyKCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgbmV4dCA9IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgaWYoIWVycikgZXJyID0gZXJyb3I7XG4gICAgICAgICAgICBpZihpID49IHJvdXRlLnN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoW3NlbnQsIGVycl0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBjdXJyID0gcm91dGUuc3RhY2tbaSsrXTtcbiAgICAgICAgICAgIGN1cnIuaGFuZGxlKHJlcSwgcmVzLCBuZXh0KTtcbiAgICAgICAgfTtcblxuICAgICAgICBuZXh0KCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH1cblxuICAgIGl0KCdzaG91bGQgbWFwIHBsYWluIHJvdXRlIHRvIHBsYWluIGNsYXNzIG1ldGhvZCcsICgpID0+IHtcbiAgICAgICAgbGV0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbiAgICAgICAgYWRkUm91dGVzKHJvdXRlciwgKCkgPT4gbmV3IENvbnRyb2xsZXIoKSk7XG4gICAgICAgIGxldCBsYXllciA9IHJvdXRlci5zdGFjay5maW5kKChsYXllcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGxheWVyLnJvdXRlLnBhdGggPT09ICcvbWV0aG9kJztcbiAgICAgICAgfSk7XG4gICAgICAgIGV4cGVjdChsYXllcikudG8uYmUub2s7XG4gICAgICAgIHJldHVybiBtb2NrUmVxKGxheWVyLnJvdXRlKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBsZXQgW3NlbnRdID0gcmVzO1xuICAgICAgICAgICAgZXhwZWN0KHNlbnQuZnJvbSkudG8uYmUuZXF1YWwoJ21ldGhvZCcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbWFwIGFzeW5jL3Byb21pc2UgbWV0aG9kIGFuZCB3cmFwIHdpdGggY2FsbCB0byBuZXh0JywgKCkgPT4ge1xuICAgICAgICBsZXQgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuICAgICAgICBhZGRSb3V0ZXMocm91dGVyLCAoKSA9PiBuZXcgQ29udHJvbGxlcigpKTtcbiAgICAgICAgbGV0IGxheWVyID0gcm91dGVyLnN0YWNrLmZpbmQoKGxheWVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbGF5ZXIucm91dGUucGF0aCA9PT0gJy9tZXRob2RBc3luYyc7XG4gICAgICAgIH0pO1xuICAgICAgICBleHBlY3QobGF5ZXIpLnRvLmJlLm9rO1xuICAgICAgICByZXR1cm4gbW9ja1JlcShsYXllci5yb3V0ZSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgbGV0IFtzZW50XSA9IHJlcztcbiAgICAgICAgICAgIGV4cGVjdChzZW50LmZyb20pLnRvLmJlLmVxdWFsKCdtZXRob2RBc3luYycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWxsb3cgcGFzc2luZyBleHRyYSBoYW5kbGVycyB0byByb3V0ZScsICgpID0+IHtcbiAgICAgICAgbGV0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbiAgICAgICAgYWRkUm91dGVzKHJvdXRlciwgKCkgPT4gbmV3IENvbnRyb2xsZXIoKSk7XG4gICAgICAgIGxldCBsYXllciA9IHJvdXRlci5zdGFjay5maW5kKChsYXllcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGxheWVyLnJvdXRlLnBhdGggPT09ICcvbWV0aG9kV2l0aEFkZGl0aW9uYWxIYW5kbGVyJztcbiAgICAgICAgfSk7XG4gICAgICAgIGV4cGVjdChsYXllcikudG8uYmUub2s7XG4gICAgICAgIHJldHVybiBtb2NrUmVxKGxheWVyLnJvdXRlKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBsZXQgW3NlbnRdID0gcmVzO1xuICAgICAgICAgICAgZXhwZWN0KHNlbnQuZnJvbSkudG8uYmUuZXF1YWwoJ21ldGhvZFdpdGhBZGRpdGlvbmFsSGFuZGxlcicpO1xuICAgICAgICAgICAgZXhwZWN0KHNlbnQuaGFuZGxlckNhbGxlZCkudG8uYmUuZXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBtYXAgcm91dGUgZGVjbGFyZWQgaW4gY29udHJ1Y3RvciB3aXRob3V0IGRlY29yYXRvcicsICgpID0+IHtcbiAgICAgICAgbGV0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbiAgICAgICAgYWRkUm91dGVzKHJvdXRlciwgKCkgPT4gbmV3IENvbnRyb2xsZXIoKSk7XG4gICAgICAgIGxldCBsYXllciA9IHJvdXRlci5zdGFjay5maW5kKChsYXllcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGxheWVyLnJvdXRlLnBhdGggPT09ICcvbWV0aG9kV2l0aG91dERlY29yYXRvcic7XG4gICAgICAgIH0pO1xuICAgICAgICBleHBlY3QobGF5ZXIpLnRvLmJlLm9rO1xuICAgICAgICByZXR1cm4gbW9ja1JlcShsYXllci5yb3V0ZSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgbGV0IFtzZW50XSA9IHJlcztcbiAgICAgICAgICAgIGV4cGVjdChzZW50LmZyb20pLnRvLmJlLmVxdWFsKCdtZXRob2RXaXRob3V0RGVjb3JhdG9yJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBieSBkZWZhdWx0IGNyZWF0ZSBhIHJvdXRlIHdpdGggdGhlIG5hbWUgb2YgdGhlIG1ldGhvZCcsICgpID0+IHtcbiAgICAgICAgbGV0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbiAgICAgICAgYWRkUm91dGVzKHJvdXRlciwgKCkgPT4gbmV3IENvbnRyb2xsZXIoKSk7XG4gICAgICAgIGxldCBsYXllciA9IHJvdXRlci5zdGFjay5maW5kKChsYXllcikgPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhsYXllci5yb3V0ZS5wYXRoKTtcbiAgICAgICAgICAgIHJldHVybiBsYXllci5yb3V0ZS5wYXRoID09PSAnL0NvbnRyb2xsZXIvZGVmYXVsdFJvdXRlQXNzaWduZWRCeU1ldGhvZE5hbWUnO1xuICAgICAgICB9KTtcbiAgICAgICAgZXhwZWN0KGxheWVyKS50by5iZS5vaztcbiAgICAgICAgcmV0dXJuIG1vY2tSZXEobGF5ZXIucm91dGUpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIGxldCBbc2VudF0gPSByZXM7XG4gICAgICAgICAgICBleHBlY3Qoc2VudC5mcm9tKS50by5iZS5lcXVhbCgnZGVmYXVsdFJvdXRlQXNzaWduZWRCeU1ldGhvZE5hbWUnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG1hcCBwbGFpbiBmdW5jdGlvbiByb3V0ZSBoYW5kbGVyJywgKCkgPT4ge1xuICAgICAgICBsZXQgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHBsYWluSGFuZGxlcik7XG4gICAgICAgIGFkZFJvdXRlcyhyb3V0ZXIsICgpID0+IHBsYWluSGFuZGxlcik7XG4gICAgICAgIGxldCBsYXllciA9IHJvdXRlci5zdGFjay5maW5kKChsYXllcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGxheWVyLnJvdXRlLnBhdGggPT09ICcvcGxhaW5IYW5kbGVyJztcbiAgICAgICAgfSk7XG4gICAgICAgIGV4cGVjdChsYXllcikudG8uYmUub2s7XG4gICAgICAgIHJldHVybiBtb2NrUmVxKGxheWVyLnJvdXRlKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBsZXQgW3NlbnRdID0gcmVzO1xuICAgICAgICAgICAgZXhwZWN0KHNlbnQuZnJvbSkudG8uYmUuZXF1YWwoJ3BsYWluSGFuZGxlcicpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgY2FsbCBuZXh0IHBhc3NpbmcgZXJyb3IgaW4gY2FzZSBvZiBleGNlcHRpb24gaW4gaGFuZGxlcicsICgpID0+IHtcbiAgICAgICAgbGV0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbiAgICAgICAgYWRkUm91dGVzKHJvdXRlciwgKCkgPT4gbmV3IENvbnRyb2xsZXIoKSk7XG4gICAgICAgIGxldCBsYXllciA9IHJvdXRlci5zdGFjay5maW5kKChsYXllcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGxheWVyLnJvdXRlLnBhdGggPT09ICcvbWV0aG9kVGhyb3dzJztcbiAgICAgICAgfSk7XG4gICAgICAgIGV4cGVjdChsYXllcikudG8uYmUub2s7XG4gICAgICAgIHJldHVybiBtb2NrUmVxKGxheWVyLnJvdXRlKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBsZXQgW3NlbnQsIGVycl0gPSByZXM7XG4gICAgICAgICAgICBleHBlY3Qoc2VudC5mcm9tKS50by5iZS5lcXVhbCgnbWV0aG9kVGhyb3dzJyk7XG4gICAgICAgICAgICBleHBlY3QoZXJyLm1lc3NhZ2UpLnRvLmJlLmVxdWFsKCd0aGlzIGlzIGFuIGVycm9yJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBjYWxsIG5leHQgcGFzc2luZyBlcnJvciBpbiBjYXNlIG9mIGV4Y2VwdGlvbiBpbiBhc3luYyBoYW5kbGVyJywgKCkgPT4ge1xuICAgICAgICBsZXQgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuICAgICAgICBhZGRSb3V0ZXMocm91dGVyLCAoKSA9PiBuZXcgQ29udHJvbGxlcigpKTtcbiAgICAgICAgbGV0IGxheWVyID0gcm91dGVyLnN0YWNrLmZpbmQoKGxheWVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbGF5ZXIucm91dGUucGF0aCA9PT0gJy9tZXRob2RUaHJvd3NBc3luYyc7XG4gICAgICAgIH0pO1xuICAgICAgICBleHBlY3QobGF5ZXIpLnRvLmJlLm9rO1xuICAgICAgICByZXR1cm4gbW9ja1JlcShsYXllci5yb3V0ZSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgbGV0IFtzZW50LCBlcnJdID0gcmVzO1xuICAgICAgICAgICAgZXhwZWN0KHNlbnQuZnJvbSkudG8uYmUuZXF1YWwoJ21ldGhvZFRocm93c0FzeW5jJyk7XG4gICAgICAgICAgICBleHBlY3QoZXJyLm1lc3NhZ2UpLnRvLmJlLmVxdWFsKCd0aGlzIGlzIGFuIGVycm9yJyk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pO1xuIl19