'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.Controller = undefined;var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _desc, _value, _class;exports.


plainHandler = plainHandler;var _decorouter = require('../decorouter');function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {return step("next", value);}, function (err) {return step("throw", err);});}}return step("next");});};}function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {var desc = {};Object['ke' + 'ys'](descriptor).forEach(function (key) {desc[key] = descriptor[key];});desc.enumerable = !!desc.enumerable;desc.configurable = !!desc.configurable;if ('value' in desc || desc.initializer) {desc.writable = true;}desc = decorators.slice().reverse().reduce(function (desc, decorator) {return decorator(target, property, desc) || desc;}, desc);if (context && desc.initializer !== void 0) {desc.value = desc.initializer ? desc.initializer.call(context) : void 0;desc.initializer = undefined;}if (desc.initializer === void 0) {Object['define' + 'Property'](target, property, desc);desc = null;}return desc;}function plainHandler(req, res) {
    res.send({ from: 'plainHandler' });}

(0, _decorouter.Route)('get', '/plainHandler')(plainHandler);let 


Controller = exports.Controller = (_dec = 






(0, _decorouter.Route)('get', '/method'), _dec2 = 





(0, _decorouter.Route)('get', '/methodAsync'), _dec3 = 





(0, _decorouter.Route)('get', '/methodWithAdditionalHandler', (req, res, next) => {res.handlerCalled = true;next();}), _dec4 = 










(0, _decorouter.Route)(), _dec5 = 




(0, _decorouter.Route)('get', '/methodThrows'), _dec6 = 





(0, _decorouter.Route)('get', '/methodThrowsAsync'), _dec7 = 





(0, _decorouter.Route)('get', '/methodWithNext'), (_class = class Controller {constructor() {(0, _decorouter.Route)('get', '/methodWithoutDecorator')(this, 'methodWithoutDecorator');} //additional handlers can be added after route eg (req, res, next) => next()
    method(req, res) {res.send({ from: 'method' });} //async methods can (and probably should) be used where neccessary
    methodAsync(req, res) {return _asyncToGenerator(function* () {res.send({ from: 'methodAsync' });})();} //additional handlers can be added after route eg (req, res, next) => next()
    methodWithAdditionalHandler(req, res) {res.send({ from: 'methodWithAdditionalHandler', handlerCalled: res.handlerCalled });}methodWithoutDecorator(req, res) {res.send({ from: 'methodWithoutDecorator' });}defaultRouteAssignedByMethodName(req, res) {res.send({ from: 'defaultRouteAssignedByMethodName' });}methodThrows(req, res) {//res.send({from: 'methodThrows'});
        throw new Error('this is an error');}methodThrowsAsync(req, res) {return _asyncToGenerator(function* () {//res.send({from: 'methodThrowsAsync'});
            throw new Error('this is an error');})();}methodWithNext(req, res, next) {setTimeout(() => {res.status(200).send({ from: 'methodWithNext' });next();}, 500);}}, (_applyDecoratedDescriptor(_class.prototype, 'method', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'method'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'methodAsync', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'methodAsync'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'methodWithAdditionalHandler', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'methodWithAdditionalHandler'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'defaultRouteAssignedByMethodName', [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, 'defaultRouteAssignedByMethodName'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'methodThrows', [_dec5], Object.getOwnPropertyDescriptor(_class.prototype, 'methodThrows'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'methodThrowsAsync', [_dec6], Object.getOwnPropertyDescriptor(_class.prototype, 'methodThrowsAsync'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'methodWithNext', [_dec7], Object.getOwnPropertyDescriptor(_class.prototype, 'methodWithNext'), _class.prototype)), _class));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3Rlc3RDb250cm9sbGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHZ0IsWSxHQUFBLFksQ0FIaEIsMkMsNm9DQUdPLFNBQVMsWUFBVCxDQUFzQixHQUF0QixFQUEyQixHQUEzQixFQUFnQztBQUNuQyxRQUFJLElBQUosQ0FBUyxFQUFDLE1BQU0sY0FBUCxFQUFULEVBQ0g7O0FBQ0QsdUJBQU0sS0FBTixFQUFZLGVBQVosRUFBNkIsWUFBN0IsRTs7O0FBR2EsVSxXQUFBLFU7Ozs7Ozs7QUFPUix1QkFBTSxLQUFOLEVBQWEsU0FBYixDOzs7Ozs7QUFNQSx1QkFBTSxLQUFOLEVBQWEsY0FBYixDOzs7Ozs7QUFNQSx1QkFBTSxLQUFOLEVBQWEsOEJBQWIsRUFBNkMsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLElBQVgsS0FBb0IsQ0FBRSxJQUFJLGFBQUosR0FBb0IsSUFBcEIsQ0FBMEIsT0FBUSxDQUFyRyxDOzs7Ozs7Ozs7OztBQVdBLHdCOzs7OztBQUtBLHVCQUFNLEtBQU4sRUFBYSxlQUFiLEM7Ozs7OztBQU1BLHVCQUFNLEtBQU4sRUFBYSxvQkFBYixDOzs7Ozs7QUFNQSx1QkFBTSxLQUFOLEVBQWEsaUJBQWIsQyxZQS9DRSxNQUFNLFVBQU4sQ0FDUCxDQUNJLGNBQWMsQ0FDVix1QkFBTSxLQUFOLEVBQVkseUJBQVosRUFBdUMsSUFBdkMsRUFBNkMsd0JBQTdDLEVBQ0gsQztBQUlELFdBQU8sR0FBUCxFQUFZLEdBQVosRUFBaUIsQ0FDYixJQUFJLElBQUosQ0FBUyxFQUFDLE1BQU0sUUFBUCxFQUFULEVBQ0gsQztBQUlLLGVBQU4sQ0FBa0IsR0FBbEIsRUFBdUIsR0FBdkIsRUFBNEIsd0NBQ3hCLElBQUksSUFBSixDQUFTLEVBQUMsTUFBTSxhQUFQLEVBQVQsRUFEd0IsS0FFM0IsQztBQUlELGdDQUE0QixHQUE1QixFQUFpQyxHQUFqQyxFQUFzQyxDQUNsQyxJQUFJLElBQUosQ0FBUyxFQUNMLE1BQU0sNkJBREQsRUFFTCxlQUFlLElBQUksYUFGZCxFQUFULEVBR0gsQ0FFRCx1QkFBdUIsR0FBdkIsRUFBNEIsR0FBNUIsRUFBaUMsQ0FDN0IsSUFBSSxJQUFKLENBQVMsRUFBQyxNQUFNLHdCQUFQLEVBQVQsRUFDSCxDQUdELGlDQUFpQyxHQUFqQyxFQUFzQyxHQUF0QyxFQUEyQyxDQUN2QyxJQUFJLElBQUosQ0FBUyxFQUFDLE1BQU0sa0NBQVAsRUFBVCxFQUNILENBR0QsYUFBYSxHQUFiLEVBQWtCLEdBQWxCLEVBQXVCLEM7QUFFbkIsY0FBTSxJQUFJLEtBQUosQ0FBVSxrQkFBVixDQUFOLENBQ0gsQ0FHSyxpQkFBTixDQUF3QixHQUF4QixFQUE2QixHQUE3QixFQUFrQyx3QztBQUU5QixrQkFBTSxJQUFJLEtBQUosQ0FBVSxrQkFBVixDQUFOLENBRjhCLEtBR2pDLENBR0QsZUFBZSxHQUFmLEVBQW9CLEdBQXBCLEVBQXlCLElBQXpCLEVBQStCLENBQzNCLFdBQVcsTUFBTSxDQUNiLElBQUksTUFBSixDQUFXLEdBQVgsRUFBZ0IsSUFBaEIsQ0FBcUIsRUFBQyxNQUFNLGdCQUFQLEVBQXJCLEVBQ0EsT0FDSCxDQUhELEVBR0csR0FISCxFQUlILENBcERMLEMiLCJmaWxlIjoidGVzdENvbnRyb2xsZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUgfSBmcm9tICcuLi9kZWNvcm91dGVyJztcblxuXG5leHBvcnQgZnVuY3Rpb24gcGxhaW5IYW5kbGVyKHJlcSwgcmVzKSB7XG4gICAgcmVzLnNlbmQoe2Zyb206ICdwbGFpbkhhbmRsZXInfSk7XG59XG5Sb3V0ZSgnZ2V0JywnL3BsYWluSGFuZGxlcicpKHBsYWluSGFuZGxlcik7XG5cblxuZXhwb3J0IGNsYXNzIENvbnRyb2xsZXJcbntcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgUm91dGUoJ2dldCcsJy9tZXRob2RXaXRob3V0RGVjb3JhdG9yJykodGhpcywgJ21ldGhvZFdpdGhvdXREZWNvcmF0b3InKTtcbiAgICB9XG5cbiAgICAvL2FkZGl0aW9uYWwgaGFuZGxlcnMgY2FuIGJlIGFkZGVkIGFmdGVyIHJvdXRlIGVnIChyZXEsIHJlcywgbmV4dCkgPT4gbmV4dCgpXG4gICAgQFJvdXRlKCdnZXQnLCAnL21ldGhvZCcpXG4gICAgbWV0aG9kKHJlcSwgcmVzKSB7XG4gICAgICAgIHJlcy5zZW5kKHtmcm9tOiAnbWV0aG9kJ30pO1xuICAgIH1cblxuICAgIC8vYXN5bmMgbWV0aG9kcyBjYW4gKGFuZCBwcm9iYWJseSBzaG91bGQpIGJlIHVzZWQgd2hlcmUgbmVjY2Vzc2FyeVxuICAgIEBSb3V0ZSgnZ2V0JywgJy9tZXRob2RBc3luYycpXG4gICAgYXN5bmMgbWV0aG9kQXN5bmMocmVxLCByZXMpIHtcbiAgICAgICAgcmVzLnNlbmQoe2Zyb206ICdtZXRob2RBc3luYyd9KTtcbiAgICB9XG5cbiAgICAvL2FkZGl0aW9uYWwgaGFuZGxlcnMgY2FuIGJlIGFkZGVkIGFmdGVyIHJvdXRlIGVnIChyZXEsIHJlcywgbmV4dCkgPT4gbmV4dCgpXG4gICAgQFJvdXRlKCdnZXQnLCAnL21ldGhvZFdpdGhBZGRpdGlvbmFsSGFuZGxlcicsIChyZXEsIHJlcywgbmV4dCkgPT4geyByZXMuaGFuZGxlckNhbGxlZCA9IHRydWU7IG5leHQoKTt9KVxuICAgIG1ldGhvZFdpdGhBZGRpdGlvbmFsSGFuZGxlcihyZXEsIHJlcykge1xuICAgICAgICByZXMuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiAnbWV0aG9kV2l0aEFkZGl0aW9uYWxIYW5kbGVyJyxcbiAgICAgICAgICAgIGhhbmRsZXJDYWxsZWQ6IHJlcy5oYW5kbGVyQ2FsbGVkfSk7XG4gICAgfVxuXG4gICAgbWV0aG9kV2l0aG91dERlY29yYXRvcihyZXEsIHJlcykge1xuICAgICAgICByZXMuc2VuZCh7ZnJvbTogJ21ldGhvZFdpdGhvdXREZWNvcmF0b3InfSk7XG4gICAgfVxuXG4gICAgQFJvdXRlKClcbiAgICBkZWZhdWx0Um91dGVBc3NpZ25lZEJ5TWV0aG9kTmFtZShyZXEsIHJlcykge1xuICAgICAgICByZXMuc2VuZCh7ZnJvbTogJ2RlZmF1bHRSb3V0ZUFzc2lnbmVkQnlNZXRob2ROYW1lJ30pO1xuICAgIH1cblxuICAgIEBSb3V0ZSgnZ2V0JywgJy9tZXRob2RUaHJvd3MnKVxuICAgIG1ldGhvZFRocm93cyhyZXEsIHJlcykge1xuICAgICAgICAvL3Jlcy5zZW5kKHtmcm9tOiAnbWV0aG9kVGhyb3dzJ30pO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoaXMgaXMgYW4gZXJyb3InKTtcbiAgICB9XG5cbiAgICBAUm91dGUoJ2dldCcsICcvbWV0aG9kVGhyb3dzQXN5bmMnKVxuICAgIGFzeW5jIG1ldGhvZFRocm93c0FzeW5jKHJlcSwgcmVzKSB7XG4gICAgICAgIC8vcmVzLnNlbmQoe2Zyb206ICdtZXRob2RUaHJvd3NBc3luYyd9KTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGlzIGlzIGFuIGVycm9yJyk7XG4gICAgfVxuICAgIFxuICAgIEBSb3V0ZSgnZ2V0JywgJy9tZXRob2RXaXRoTmV4dCcpXG4gICAgbWV0aG9kV2l0aE5leHQocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh7ZnJvbTogJ21ldGhvZFdpdGhOZXh0J30pO1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9LCA1MDApO1xuICAgIH1cblxufVxuIl19