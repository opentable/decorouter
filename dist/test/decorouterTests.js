'use strict';var _decorouter = require('../decorouter');
var _testControllers = require('./testControllers');
var _express = require('express');var _express2 = _interopRequireDefault(_express);
var _chai = require('chai');var chai = _interopRequireWildcard(_chai);
var _supertest = require('supertest');var _supertest2 = _interopRequireDefault(_supertest);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

let expect = chai.expect;
chai.config.includeStack = true;

describe('Express class method route decorator tests', () => {

    let app = (0, _express2.default)();
    let server = null;

    before(done => {
        let router = _express2.default.Router();
        (0, _decorouter.addRoutes)(router, () => new _testControllers.Controller());
        (0, _decorouter.addRoutes)(router, () => _testControllers.plainHandler);
        app.use('/', router);
        server = app.listen(3131, () => {
            done();
            console.log('starting');});});


    after(done => {
        server.close();
        console.log('finish');
        done();});


    it('should map plain route to plain class method', done => {

        (0, _supertest2.default)(server).
        get('/method').
        expect(200, { 
            from: 'method' }, 
        done);});


    it('should map async/promise method and wrap with call to next', done => {

        (0, _supertest2.default)(server).
        get('/methodAsync').
        expect(200, { 
            from: 'methodAsync' }, 
        done);});


    it('should allow passing extra handlers to route', done => {

        (0, _supertest2.default)(server).
        get('/methodWithAdditionalHandler').
        expect(200, { 
            from: 'methodWithAdditionalHandler', 
            handlerCalled: true }, 
        done);});


    it('should map route declared in contructor without decorator', done => {

        (0, _supertest2.default)(server).
        get('/methodWithoutDecorator').
        expect(200, { 
            from: 'methodWithoutDecorator' }, 
        done);});


    it('should by default create a route with the name of the method', done => {

        (0, _supertest2.default)(server).
        get('/Controller/defaultRouteAssignedByMethodName').
        expect(200, { 
            from: 'defaultRouteAssignedByMethodName' }, 
        done);});


    it('should map plain function route handler', done => {

        (0, _supertest2.default)(server).
        get('/plainHandler').
        expect(200, { 
            from: 'plainHandler' }, 
        done);});


    it('should call next passing error in case of exception in handler', done => {

        (0, _supertest2.default)(server).
        get('/methodThrows').
        expect(500, done);});


    it('should call next passing error in case of exception in async handler', done => {

        (0, _supertest2.default)(server).
        get('/methodThrowsAsync').
        expect(500, done);});


    it('should deal with route handlers that specify next', done => {

        (0, _supertest2.default)(server).
        get('/methodWithNext').
        expect(200, { 
            from: 'methodWithNext' }, 
        done);});});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2RlY29yb3V0ZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiYUFBQTtBQUNBO0FBQ0Esa0M7QUFDQSw0QixJQUFZLEk7QUFDWixzQzs7QUFFQSxJQUFJLFNBQVMsS0FBSyxNQUFsQjtBQUNBLEtBQUssTUFBTCxDQUFZLFlBQVosR0FBMkIsSUFBM0I7O0FBRUEsU0FBUyw0Q0FBVCxFQUF1RCxNQUFNOztBQUV6RCxRQUFJLE1BQU0sd0JBQVY7QUFDQSxRQUFJLFNBQVMsSUFBYjs7QUFFQSxXQUFRLElBQUQsSUFBVTtBQUNiLFlBQUksU0FBUyxrQkFBUSxNQUFSLEVBQWI7QUFDQSxtQ0FBVSxNQUFWLEVBQWtCLE1BQU0saUNBQXhCO0FBQ0EsbUNBQVUsTUFBVixFQUFrQixtQ0FBbEI7QUFDQSxZQUFJLEdBQUosQ0FBUSxHQUFSLEVBQWEsTUFBYjtBQUNBLGlCQUFTLElBQUksTUFBSixDQUFXLElBQVgsRUFBaUIsTUFBTTtBQUM1QjtBQUNBLG9CQUFRLEdBQVIsQ0FBWSxVQUFaLEVBQ0gsQ0FIUSxDQUFULENBSUgsQ0FURDs7O0FBVUEsVUFBTyxJQUFELElBQVU7QUFDWixlQUFPLEtBQVA7QUFDQSxnQkFBUSxHQUFSLENBQVksUUFBWjtBQUNBLGVBQ0gsQ0FKRDs7O0FBTUEsT0FBRyw4Q0FBSCxFQUFvRCxJQUFELElBQVU7O0FBRXpELGlDQUFRLE1BQVI7QUFDQyxXQURELENBQ0ssU0FETDtBQUVDLGNBRkQsQ0FFUSxHQUZSLEVBRWE7QUFDVCxrQkFBTSxRQURHLEVBRmI7QUFJRyxZQUpILEVBS0gsQ0FQRDs7O0FBU0EsT0FBRyw0REFBSCxFQUFrRSxJQUFELElBQVU7O0FBRXZFLGlDQUFRLE1BQVI7QUFDQyxXQURELENBQ0ssY0FETDtBQUVDLGNBRkQsQ0FFUSxHQUZSLEVBRWE7QUFDVCxrQkFBTSxhQURHLEVBRmI7QUFJRyxZQUpILEVBS0gsQ0FQRDs7O0FBU0EsT0FBRyw4Q0FBSCxFQUFvRCxJQUFELElBQVU7O0FBRXpELGlDQUFRLE1BQVI7QUFDQyxXQURELENBQ0ssOEJBREw7QUFFQyxjQUZELENBRVEsR0FGUixFQUVhO0FBQ1Qsa0JBQU0sNkJBREc7QUFFVCwyQkFBZSxJQUZOLEVBRmI7QUFLRyxZQUxILEVBTUgsQ0FSRDs7O0FBVUEsT0FBRywyREFBSCxFQUFpRSxJQUFELElBQVU7O0FBRXRFLGlDQUFRLE1BQVI7QUFDQyxXQURELENBQ0sseUJBREw7QUFFQyxjQUZELENBRVEsR0FGUixFQUVhO0FBQ1Qsa0JBQU0sd0JBREcsRUFGYjtBQUlHLFlBSkgsRUFLSCxDQVBEOzs7QUFTQSxPQUFHLDhEQUFILEVBQW9FLElBQUQsSUFBVTs7QUFFekUsaUNBQVEsTUFBUjtBQUNDLFdBREQsQ0FDSyw4Q0FETDtBQUVDLGNBRkQsQ0FFUSxHQUZSLEVBRWE7QUFDVCxrQkFBTSxrQ0FERyxFQUZiO0FBSUcsWUFKSCxFQUtILENBUEQ7OztBQVNBLE9BQUcseUNBQUgsRUFBK0MsSUFBRCxJQUFVOztBQUVwRCxpQ0FBUSxNQUFSO0FBQ0MsV0FERCxDQUNLLGVBREw7QUFFQyxjQUZELENBRVEsR0FGUixFQUVhO0FBQ1Qsa0JBQU0sY0FERyxFQUZiO0FBSUcsWUFKSCxFQUtILENBUEQ7OztBQVNBLE9BQUcsZ0VBQUgsRUFBc0UsSUFBRCxJQUFVOztBQUUzRSxpQ0FBUSxNQUFSO0FBQ0MsV0FERCxDQUNLLGVBREw7QUFFQyxjQUZELENBRVEsR0FGUixFQUVhLElBRmIsRUFHSCxDQUxEOzs7QUFPQSxPQUFHLHNFQUFILEVBQTRFLElBQUQsSUFBVTs7QUFFakYsaUNBQVEsTUFBUjtBQUNDLFdBREQsQ0FDSyxvQkFETDtBQUVDLGNBRkQsQ0FFUSxHQUZSLEVBRWEsSUFGYixFQUdILENBTEQ7OztBQU9BLE9BQUcsbURBQUgsRUFBeUQsSUFBRCxJQUFVOztBQUU5RCxpQ0FBUSxNQUFSO0FBQ0MsV0FERCxDQUNLLGlCQURMO0FBRUMsY0FGRCxDQUVRLEdBRlIsRUFFYTtBQUNULGtCQUFNLGdCQURHLEVBRmI7QUFJRyxZQUpILEVBS0gsQ0FQRCxFQVFILENBbEdEIiwiZmlsZSI6ImRlY29yb3V0ZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YWRkUm91dGVzLCBhZGRSb3V0ZXNGcm9tRGlyIH0gZnJvbSAnLi4vZGVjb3JvdXRlcic7XG5pbXBvcnQgeyBDb250cm9sbGVyLCBwbGFpbkhhbmRsZXIgfSBmcm9tICcuL3Rlc3RDb250cm9sbGVycyc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICdzdXBlcnRlc3QnO1xuXG5sZXQgZXhwZWN0ID0gY2hhaS5leHBlY3Q7XG5jaGFpLmNvbmZpZy5pbmNsdWRlU3RhY2sgPSB0cnVlO1xuXG5kZXNjcmliZSgnRXhwcmVzcyBjbGFzcyBtZXRob2Qgcm91dGUgZGVjb3JhdG9yIHRlc3RzJywgKCkgPT4ge1xuICAgIFxuICAgIGxldCBhcHAgPSBleHByZXNzKCk7XG4gICAgbGV0IHNlcnZlciA9IG51bGw7XG5cbiAgICBiZWZvcmUoKGRvbmUpID0+IHtcbiAgICAgICAgbGV0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG4gICAgICAgIGFkZFJvdXRlcyhyb3V0ZXIsICgpID0+IG5ldyBDb250cm9sbGVyKCkpO1xuICAgICAgICBhZGRSb3V0ZXMocm91dGVyLCAoKSA9PiBwbGFpbkhhbmRsZXIpO1xuICAgICAgICBhcHAudXNlKCcvJywgcm91dGVyKTtcbiAgICAgICAgc2VydmVyID0gYXBwLmxpc3RlbigzMTMxLCAoKSA9PiB7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc3RhcnRpbmcnKTtcbiAgICAgICAgfSk7ICAgICBcbiAgICB9KTtcbiAgICBhZnRlcigoZG9uZSkgPT4ge1xuICAgICAgICBzZXJ2ZXIuY2xvc2UoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZpbmlzaCcpO1xuICAgICAgICBkb25lKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG1hcCBwbGFpbiByb3V0ZSB0byBwbGFpbiBjbGFzcyBtZXRob2QnLCAoZG9uZSkgPT4ge1xuICAgIFxuICAgICAgICByZXF1ZXN0KHNlcnZlcilcbiAgICAgICAgLmdldCgnL21ldGhvZCcpXG4gICAgICAgIC5leHBlY3QoMjAwLCB7XG4gICAgICAgICAgICBmcm9tOiAnbWV0aG9kJ1xuICAgICAgICB9LCBkb25lKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbWFwIGFzeW5jL3Byb21pc2UgbWV0aG9kIGFuZCB3cmFwIHdpdGggY2FsbCB0byBuZXh0JywgKGRvbmUpID0+IHtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qoc2VydmVyKVxuICAgICAgICAuZ2V0KCcvbWV0aG9kQXN5bmMnKVxuICAgICAgICAuZXhwZWN0KDIwMCwge1xuICAgICAgICAgICAgZnJvbTogJ21ldGhvZEFzeW5jJ1xuICAgICAgICB9LCBkb25lKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWxsb3cgcGFzc2luZyBleHRyYSBoYW5kbGVycyB0byByb3V0ZScsIChkb25lKSA9PiB7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0KHNlcnZlcilcbiAgICAgICAgLmdldCgnL21ldGhvZFdpdGhBZGRpdGlvbmFsSGFuZGxlcicpXG4gICAgICAgIC5leHBlY3QoMjAwLCB7XG4gICAgICAgICAgICBmcm9tOiAnbWV0aG9kV2l0aEFkZGl0aW9uYWxIYW5kbGVyJyxcbiAgICAgICAgICAgIGhhbmRsZXJDYWxsZWQ6IHRydWVcbiAgICAgICAgfSwgZG9uZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG1hcCByb3V0ZSBkZWNsYXJlZCBpbiBjb250cnVjdG9yIHdpdGhvdXQgZGVjb3JhdG9yJywgKGRvbmUpID0+IHtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qoc2VydmVyKVxuICAgICAgICAuZ2V0KCcvbWV0aG9kV2l0aG91dERlY29yYXRvcicpXG4gICAgICAgIC5leHBlY3QoMjAwLCB7XG4gICAgICAgICAgICBmcm9tOiAnbWV0aG9kV2l0aG91dERlY29yYXRvcidcbiAgICAgICAgfSwgZG9uZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJ5IGRlZmF1bHQgY3JlYXRlIGEgcm91dGUgd2l0aCB0aGUgbmFtZSBvZiB0aGUgbWV0aG9kJywgKGRvbmUpID0+IHtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qoc2VydmVyKVxuICAgICAgICAuZ2V0KCcvQ29udHJvbGxlci9kZWZhdWx0Um91dGVBc3NpZ25lZEJ5TWV0aG9kTmFtZScpXG4gICAgICAgIC5leHBlY3QoMjAwLCB7XG4gICAgICAgICAgICBmcm9tOiAnZGVmYXVsdFJvdXRlQXNzaWduZWRCeU1ldGhvZE5hbWUnXG4gICAgICAgIH0sIGRvbmUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBtYXAgcGxhaW4gZnVuY3Rpb24gcm91dGUgaGFuZGxlcicsIChkb25lKSA9PiB7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0KHNlcnZlcilcbiAgICAgICAgLmdldCgnL3BsYWluSGFuZGxlcicpXG4gICAgICAgIC5leHBlY3QoMjAwLCB7XG4gICAgICAgICAgICBmcm9tOiAncGxhaW5IYW5kbGVyJ1xuICAgICAgICB9LCBkb25lKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgY2FsbCBuZXh0IHBhc3NpbmcgZXJyb3IgaW4gY2FzZSBvZiBleGNlcHRpb24gaW4gaGFuZGxlcicsIChkb25lKSA9PiB7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0KHNlcnZlcilcbiAgICAgICAgLmdldCgnL21ldGhvZFRocm93cycpXG4gICAgICAgIC5leHBlY3QoNTAwLCBkb25lKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgY2FsbCBuZXh0IHBhc3NpbmcgZXJyb3IgaW4gY2FzZSBvZiBleGNlcHRpb24gaW4gYXN5bmMgaGFuZGxlcicsIChkb25lKSA9PiB7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0KHNlcnZlcilcbiAgICAgICAgLmdldCgnL21ldGhvZFRocm93c0FzeW5jJylcbiAgICAgICAgLmV4cGVjdCg1MDAsIGRvbmUpOyAgICAgICBcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZGVhbCB3aXRoIHJvdXRlIGhhbmRsZXJzIHRoYXQgc3BlY2lmeSBuZXh0JywgKGRvbmUpID0+IHtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qoc2VydmVyKVxuICAgICAgICAuZ2V0KCcvbWV0aG9kV2l0aE5leHQnKVxuICAgICAgICAuZXhwZWN0KDIwMCwge1xuICAgICAgICAgICAgZnJvbTogJ21ldGhvZFdpdGhOZXh0J1xuICAgICAgICB9LCBkb25lKTtcbiAgICB9KTtcbn0pO1xuIl19