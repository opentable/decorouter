'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Controller = undefined;

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _desc, _value, _class;

exports.plainHandler = plainHandler;

var _decorouter = require('../decorouter');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function plainHandler(req, res) {
    res.send({ from: 'plainHandler' });
}
(0, _decorouter.Route)('get', '/plainHandler')(plainHandler);

let Controller = exports.Controller = (_dec = (0, _decorouter.Route)('get', '/method'), _dec2 = (0, _decorouter.Route)('get', '/methodAsync'), _dec3 = (0, _decorouter.Route)('get', '/methodWithAdditionalHandler', (req, res, next) => {
    res.handlerCalled = true;next();
}), _dec4 = (0, _decorouter.Route)(), _dec5 = (0, _decorouter.Route)('get', '/methodThrows'), _dec6 = (0, _decorouter.Route)('get', '/methodThrowsAsync'), (_class = class Controller {
    constructor() {
        (0, _decorouter.Route)('get', '/methodWithoutDecorator')(this, 'methodWithoutDecorator');
    }

    //additional handlers can be added after route eg (req, res, next) => next()

    method(req, res) {
        res.send({ from: 'method' });
    }

    //async methods can (and probably should) be used where neccessary

    methodAsync(req, res) {
        return _asyncToGenerator(function* () {
            res.send({ from: 'methodAsync' });
        })();
    }

    //additional handlers can be added after route eg (req, res, next) => next()

    methodWithAdditionalHandler(req, res) {
        res.send({
            from: 'methodWithAdditionalHandler',
            handlerCalled: res.handlerCalled });
    }

    methodWithoutDecorator(req, res) {
        res.send({ from: 'methodWithoutDecorator' });
    }

    defaultRouteAssignedByMethodName(req, res) {
        res.send({ from: 'defaultRouteAssignedByMethodName' });
    }

    methodThrows(req, res) {
        res.send({ from: 'methodThrows' });
        throw new Error('this is an error');
    }

    methodThrowsAsync(req, res) {
        return _asyncToGenerator(function* () {
            res.send({ from: 'methodThrowsAsync' });
            throw new Error('this is an error');
        })();
    }

}, (_applyDecoratedDescriptor(_class.prototype, 'method', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'method'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'methodAsync', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'methodAsync'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'methodWithAdditionalHandler', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'methodWithAdditionalHandler'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'defaultRouteAssignedByMethodName', [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, 'defaultRouteAssignedByMethodName'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'methodThrows', [_dec5], Object.getOwnPropertyDescriptor(_class.prototype, 'methodThrows'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'methodThrowsAsync', [_dec6], Object.getOwnPropertyDescriptor(_class.prototype, 'methodThrowsAsync'), _class.prototype)), _class));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3Rlc3RDb250cm9sbGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7UUFHZ0IsWSxHQUFBLFk7O0FBSGhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHTyxTQUFTLFlBQVQsQ0FBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBK0I7QUFDbEMsUUFBSSxJQUFKLENBQVMsRUFBQyxNQUFNLGNBQVAsRUFBVDtBQUNIO0FBQ0QsdUJBQU0sS0FBTixFQUFZLGVBQVosRUFBNkIsWUFBN0I7O0lBR2EsVSxXQUFBLFUsV0FPUix1QkFBTSxLQUFOLEVBQWEsU0FBYixDLFVBTUEsdUJBQU0sS0FBTixFQUFhLGNBQWIsQyxVQU1BLHVCQUFNLEtBQU4sRUFBYSw4QkFBYixFQUE2QyxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsSUFBWCxLQUFvQjtBQUFFLFFBQUksYUFBSixHQUFvQixJQUFwQixDQUEwQjtBQUFRLENBQXJHLEMsVUFXQSx3QixVQUtBLHVCQUFNLEtBQU4sRUFBYSxlQUFiLEMsVUFNQSx1QkFBTSxLQUFOLEVBQWEsb0JBQWIsQyxZQXpDRSxNQUFNLFVBQU4sQ0FDUDtBQUNJLGtCQUFhO0FBQ1QsK0JBQU0sS0FBTixFQUFZLHlCQUFaLEVBQXVDLElBQXZDLEVBQTZDLHdCQUE3QztBQUNIOzs7O0FBSUQsV0FBTyxHQUFQLEVBQVksR0FBWixFQUFpQjtBQUNiLFlBQUksSUFBSixDQUFTLEVBQUMsTUFBTSxRQUFQLEVBQVQ7QUFDSDs7OztBQUlLLGVBQU4sQ0FBa0IsR0FBbEIsRUFBdUIsR0FBdkIsRUFBMkI7QUFBQTtBQUN2QixnQkFBSSxJQUFKLENBQVMsRUFBQyxNQUFNLGFBQVAsRUFBVDtBQUR1QjtBQUUxQjs7OztBQUlELGdDQUE0QixHQUE1QixFQUFpQyxHQUFqQyxFQUFzQztBQUNsQyxZQUFJLElBQUosQ0FBUztBQUNMLGtCQUFNLDZCQUREO0FBRUwsMkJBQWUsSUFBSSxhQUZkLEVBQVQ7QUFHSDs7QUFFRCwyQkFBdUIsR0FBdkIsRUFBNEIsR0FBNUIsRUFBaUM7QUFDN0IsWUFBSSxJQUFKLENBQVMsRUFBQyxNQUFNLHdCQUFQLEVBQVQ7QUFDSDs7QUFHRCxxQ0FBaUMsR0FBakMsRUFBc0MsR0FBdEMsRUFBMEM7QUFDdEMsWUFBSSxJQUFKLENBQVMsRUFBQyxNQUFNLGtDQUFQLEVBQVQ7QUFDSDs7QUFHRCxpQkFBYSxHQUFiLEVBQWtCLEdBQWxCLEVBQXVCO0FBQ25CLFlBQUksSUFBSixDQUFTLEVBQUMsTUFBTSxjQUFQLEVBQVQ7QUFDQSxjQUFNLElBQUksS0FBSixDQUFVLGtCQUFWLENBQU47QUFDSDs7QUFHSyxxQkFBTixDQUF3QixHQUF4QixFQUE2QixHQUE3QixFQUFrQztBQUFBO0FBQzlCLGdCQUFJLElBQUosQ0FBUyxFQUFDLE1BQU0sbUJBQVAsRUFBVDtBQUNBLGtCQUFNLElBQUksS0FBSixDQUFVLGtCQUFWLENBQU47QUFGOEI7QUFHakM7O0FBNUNMLEMiLCJmaWxlIjoidGVzdENvbnRyb2xsZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUgfSBmcm9tICcuLi9kZWNvcm91dGVyJztcblxuXG5leHBvcnQgZnVuY3Rpb24gcGxhaW5IYW5kbGVyKHJlcSwgcmVzKXtcbiAgICByZXMuc2VuZCh7ZnJvbTogJ3BsYWluSGFuZGxlcid9KTtcbn1cblJvdXRlKCdnZXQnLCcvcGxhaW5IYW5kbGVyJykocGxhaW5IYW5kbGVyKTtcblxuXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlclxue1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIFJvdXRlKCdnZXQnLCcvbWV0aG9kV2l0aG91dERlY29yYXRvcicpKHRoaXMsICdtZXRob2RXaXRob3V0RGVjb3JhdG9yJyk7XG4gICAgfVxuXG4gICAgLy9hZGRpdGlvbmFsIGhhbmRsZXJzIGNhbiBiZSBhZGRlZCBhZnRlciByb3V0ZSBlZyAocmVxLCByZXMsIG5leHQpID0+IG5leHQoKVxuICAgIEBSb3V0ZSgnZ2V0JywgJy9tZXRob2QnKVxuICAgIG1ldGhvZChyZXEsIHJlcykge1xuICAgICAgICByZXMuc2VuZCh7ZnJvbTogJ21ldGhvZCd9KTtcbiAgICB9XG4gICAgXG4gICAgLy9hc3luYyBtZXRob2RzIGNhbiAoYW5kIHByb2JhYmx5IHNob3VsZCkgYmUgdXNlZCB3aGVyZSBuZWNjZXNzYXJ5XG4gICAgQFJvdXRlKCdnZXQnLCAnL21ldGhvZEFzeW5jJylcbiAgICBhc3luYyBtZXRob2RBc3luYyhyZXEsIHJlcyl7XG4gICAgICAgIHJlcy5zZW5kKHtmcm9tOiAnbWV0aG9kQXN5bmMnfSk7XG4gICAgfVxuICAgIFxuICAgIC8vYWRkaXRpb25hbCBoYW5kbGVycyBjYW4gYmUgYWRkZWQgYWZ0ZXIgcm91dGUgZWcgKHJlcSwgcmVzLCBuZXh0KSA9PiBuZXh0KClcbiAgICBAUm91dGUoJ2dldCcsICcvbWV0aG9kV2l0aEFkZGl0aW9uYWxIYW5kbGVyJywgKHJlcSwgcmVzLCBuZXh0KSA9PiB7IHJlcy5oYW5kbGVyQ2FsbGVkID0gdHJ1ZTsgbmV4dCgpO30pXG4gICAgbWV0aG9kV2l0aEFkZGl0aW9uYWxIYW5kbGVyKHJlcSwgcmVzKSB7XG4gICAgICAgIHJlcy5zZW5kKHtcbiAgICAgICAgICAgIGZyb206ICdtZXRob2RXaXRoQWRkaXRpb25hbEhhbmRsZXInLCBcbiAgICAgICAgICAgIGhhbmRsZXJDYWxsZWQ6IHJlcy5oYW5kbGVyQ2FsbGVkfSk7XG4gICAgfVxuICAgIFxuICAgIG1ldGhvZFdpdGhvdXREZWNvcmF0b3IocmVxLCByZXMpIHtcbiAgICAgICAgcmVzLnNlbmQoe2Zyb206ICdtZXRob2RXaXRob3V0RGVjb3JhdG9yJ30pO1xuICAgIH1cbiAgICBcbiAgICBAUm91dGUoKVxuICAgIGRlZmF1bHRSb3V0ZUFzc2lnbmVkQnlNZXRob2ROYW1lKHJlcSwgcmVzKXtcbiAgICAgICAgcmVzLnNlbmQoe2Zyb206ICdkZWZhdWx0Um91dGVBc3NpZ25lZEJ5TWV0aG9kTmFtZSd9KTsgXG4gICAgfVxuICAgIFxuICAgIEBSb3V0ZSgnZ2V0JywgJy9tZXRob2RUaHJvd3MnKVxuICAgIG1ldGhvZFRocm93cyhyZXEsIHJlcykgeyAgICAgICBcbiAgICAgICAgcmVzLnNlbmQoe2Zyb206ICdtZXRob2RUaHJvd3MnfSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhpcyBpcyBhbiBlcnJvcicpO1xuICAgIH1cbiAgICBcbiAgICBAUm91dGUoJ2dldCcsICcvbWV0aG9kVGhyb3dzQXN5bmMnKVxuICAgIGFzeW5jIG1ldGhvZFRocm93c0FzeW5jKHJlcSwgcmVzKSB7ICAgICAgIFxuICAgICAgICByZXMuc2VuZCh7ZnJvbTogJ21ldGhvZFRocm93c0FzeW5jJ30pO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoaXMgaXMgYW4gZXJyb3InKTtcbiAgICB9XG4gICAgXG4gICAgICAgXG59XG5cbiJdfQ==