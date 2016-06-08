'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addRoutes = addRoutes;
exports.Route = Route;

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//support async/promise route handlers and non promise handlers
const asyncWrap = fn => (...args) => {
    try {
        let res = fn(...args);
        Promise.resolve(res).then(args[2]).catch(args[2]);
    } catch (err) {
        args[2](err);
    }
};

function addRoutes(router, functionFactory) {

    (0, _assert2.default)(functionFactory);

    let inst = functionFactory();
    if (typeof inst === 'object') {
        let prot = Object.getPrototypeOf(inst);
        let routeMethods = Object.getOwnPropertyNames(prot).filter(n => !!prot[n].$route).map(n => prot[n]);

        routeMethods.forEach(m => {
            router[m.$route.verb](m.$route.path, [...(m.$route.middleware || []), asyncWrap(m.bind(inst))]);
        });
    } else if (typeof inst === 'function' && inst.$route) {
        router[inst.$route.verb](inst.$route.path, [...(inst.$route.middleware || []), asyncWrap(inst)]);
    }
}

function Route(verb, path, ...middleware) {
    return function decorator(target, key) {
        //console.log(typeof(target));
        let namepath = target.name || target.constructor.name;
        namepath = (namepath || '') + (key && namepath ? '/' + key : key || '');
        if (!verb) verb = 'get';
        if (!path) path = `/${ namepath }`;
        (key ? target[key] : target).$route = { verb, path, middleware };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWNvcm91dGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O1FBYWdCLFMsR0FBQSxTO1FBb0JBLEssR0FBQSxLOztBQWpDaEI7Ozs7Ozs7QUFHQSxNQUFNLFlBQVksTUFBTSxDQUFDLEdBQUcsSUFBSixLQUFhO0FBQ2pDLFFBQUc7QUFDQyxZQUFJLE1BQU0sR0FBRyxHQUFHLElBQU4sQ0FBVjtBQUNBLGdCQUFRLE9BQVIsQ0FBZ0IsR0FBaEIsRUFBcUIsSUFBckIsQ0FBMEIsS0FBSyxDQUFMLENBQTFCLEVBQW1DLEtBQW5DLENBQXlDLEtBQUssQ0FBTCxDQUF6QztBQUNILEtBSEQsQ0FHRSxPQUFNLEdBQU4sRUFBVTtBQUNSLGFBQUssQ0FBTCxFQUFRLEdBQVI7QUFDSDtBQUNKLENBUEQ7O0FBVU8sU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCLGVBQTNCLEVBQTJDOztBQUU5QywwQkFBTyxlQUFQOztBQUVBLFFBQUksT0FBTyxpQkFBWDtBQUNBLFFBQUcsT0FBTyxJQUFQLEtBQWdCLFFBQW5CLEVBQTZCO0FBQ3pCLFlBQUksT0FBUSxPQUFPLGNBQVAsQ0FBc0IsSUFBdEIsQ0FBWjtBQUNBLFlBQUksZUFBZSxPQUFPLG1CQUFQLENBQTJCLElBQTNCLEVBQ2QsTUFEYyxDQUNOLENBQUQsSUFBTyxDQUFDLENBQUMsS0FBSyxDQUFMLEVBQVEsTUFEVixFQUVkLEdBRmMsQ0FFVCxLQUFLLEtBQUssQ0FBTCxDQUZJLENBQW5COztBQUlBLHFCQUFhLE9BQWIsQ0FBc0IsQ0FBRCxJQUFPO0FBQ3hCLG1CQUFPLEVBQUUsTUFBRixDQUFTLElBQWhCLEVBQXNCLEVBQUUsTUFBRixDQUFTLElBQS9CLEVBQXFDLENBQUMsSUFBSSxFQUFFLE1BQUYsQ0FBUyxVQUFULElBQXVCLEVBQTNCLENBQUQsRUFBaUMsVUFBVSxFQUFFLElBQUYsQ0FBTyxJQUFQLENBQVYsQ0FBakMsQ0FBckM7QUFDSCxTQUZEO0FBR0gsS0FURCxNQVVLLElBQUcsT0FBTyxJQUFQLEtBQWdCLFVBQWhCLElBQThCLEtBQUssTUFBdEMsRUFBOEM7QUFDL0MsZUFBTyxLQUFLLE1BQUwsQ0FBWSxJQUFuQixFQUF5QixLQUFLLE1BQUwsQ0FBWSxJQUFyQyxFQUEyQyxDQUFDLElBQUksS0FBSyxNQUFMLENBQVksVUFBWixJQUEwQixFQUE5QixDQUFELEVBQW9DLFVBQVUsSUFBVixDQUFwQyxDQUEzQztBQUNIO0FBQ0o7O0FBRU0sU0FBUyxLQUFULENBQWUsSUFBZixFQUFxQixJQUFyQixFQUEyQixHQUFHLFVBQTlCLEVBQTBDO0FBQzdDLFdBQU8sU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCLEdBQTNCLEVBQWdDOztBQUVuQyxZQUFJLFdBQVcsT0FBTyxJQUFQLElBQWUsT0FBTyxXQUFQLENBQW1CLElBQWpEO0FBQ0EsbUJBQVcsQ0FBQyxZQUFZLEVBQWIsS0FBb0IsT0FBTyxRQUFQLEdBQWtCLE1BQU0sR0FBeEIsR0FBK0IsT0FBTyxFQUExRCxDQUFYO0FBQ0EsWUFBRyxDQUFDLElBQUosRUFBVSxPQUFPLEtBQVA7QUFDVixZQUFHLENBQUMsSUFBSixFQUFVLE9BQU8sQ0FBQyxDQUFELEdBQUksUUFBSixFQUFhLEFBQWIsQ0FBUDtBQUNWLFNBQUMsTUFBTSxPQUFPLEdBQVAsQ0FBTixHQUFvQixNQUFyQixFQUE2QixNQUE3QixHQUFzQyxFQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsVUFBYixFQUF0QztBQUNILEtBUEQ7QUFRSCIsImZpbGUiOiJkZWNvcm91dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVmYXVsdCBhcyBhc3NlcnQgfSBmcm9tICdhc3NlcnQnO1xuXG4vL3N1cHBvcnQgYXN5bmMvcHJvbWlzZSByb3V0ZSBoYW5kbGVycyBhbmQgbm9uIHByb21pc2UgaGFuZGxlcnNcbmNvbnN0IGFzeW5jV3JhcCA9IGZuID0+ICguLi5hcmdzKSA9PiB7XG4gICAgdHJ5e1xuICAgICAgICBsZXQgcmVzID0gZm4oLi4uYXJncyk7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZShyZXMpLnRoZW4oYXJnc1syXSkuY2F0Y2goYXJnc1syXSk7XG4gICAgfSBjYXRjaChlcnIpe1xuICAgICAgICBhcmdzWzJdKGVycik7XG4gICAgfVxufTtcblxuXG5leHBvcnQgZnVuY3Rpb24gYWRkUm91dGVzKHJvdXRlciwgZnVuY3Rpb25GYWN0b3J5KXtcbiAgICBcbiAgICBhc3NlcnQoZnVuY3Rpb25GYWN0b3J5KTtcblxuICAgIGxldCBpbnN0ID0gZnVuY3Rpb25GYWN0b3J5KCk7XG4gICAgaWYodHlwZW9mIGluc3QgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGxldCBwcm90ID0gIE9iamVjdC5nZXRQcm90b3R5cGVPZihpbnN0KTtcbiAgICAgICAgbGV0IHJvdXRlTWV0aG9kcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3QpXG4gICAgICAgICAgICAuZmlsdGVyKChuKSA9PiAhIXByb3Rbbl0uJHJvdXRlKVxuICAgICAgICAgICAgLm1hcCgobiA9PiBwcm90W25dKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgcm91dGVNZXRob2RzLmZvckVhY2goKG0pID0+IHsgXG4gICAgICAgICAgICByb3V0ZXJbbS4kcm91dGUudmVyYl0obS4kcm91dGUucGF0aCwgWy4uLihtLiRyb3V0ZS5taWRkbGV3YXJlIHx8IFtdKSwgYXN5bmNXcmFwKG0uYmluZChpbnN0KSldKTtcbiAgICAgICAgfSk7ICAgIFxuICAgIH1cbiAgICBlbHNlIGlmKHR5cGVvZiBpbnN0ID09PSAnZnVuY3Rpb24nICYmIGluc3QuJHJvdXRlKSB7XG4gICAgICAgIHJvdXRlcltpbnN0LiRyb3V0ZS52ZXJiXShpbnN0LiRyb3V0ZS5wYXRoLCBbLi4uKGluc3QuJHJvdXRlLm1pZGRsZXdhcmUgfHwgW10pLCBhc3luY1dyYXAoaW5zdCldKTsgICAgICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJvdXRlKHZlcmIsIHBhdGgsIC4uLm1pZGRsZXdhcmUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gZGVjb3JhdG9yKHRhcmdldCwga2V5KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2codHlwZW9mKHRhcmdldCkpO1xuICAgICAgICBsZXQgbmFtZXBhdGggPSB0YXJnZXQubmFtZSB8fCB0YXJnZXQuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgbmFtZXBhdGggPSAobmFtZXBhdGggfHwgJycpICsgKGtleSAmJiBuYW1lcGF0aCA/ICcvJyArIGtleSA6IChrZXkgfHwgJycpKTtcbiAgICAgICAgaWYoIXZlcmIpIHZlcmIgPSAnZ2V0JztcbiAgICAgICAgaWYoIXBhdGgpIHBhdGggPSBgLyR7bmFtZXBhdGh9YDsgXG4gICAgICAgIChrZXkgPyB0YXJnZXRba2V5XSA6IHRhcmdldCkuJHJvdXRlID0ge3ZlcmIsIHBhdGgsIG1pZGRsZXdhcmV9O1xuICAgIH07XG59Il19