import { default as assert } from 'assert';

//support async/promise route handlers and non promise handlers
const asyncWrap = fn => (...args) => {
    try{
        let res = fn(...args);
        Promise.resolve(res).then(args[2]).catch(args[2]);
    } catch(err){
        args[2](err);
    }
};


export function addRoutes(router, functionFactory){
    
    assert(functionFactory);

    let inst = functionFactory();
    if(typeof inst === 'object') {
        let prot =  Object.getPrototypeOf(inst);
        let routeMethods = Object.getOwnPropertyNames(prot)
            .filter((n) => !!prot[n].$route)
            .map((n => prot[n]));
            
        routeMethods.forEach((m) => { 
            router[m.$route.verb](m.$route.path, [...(m.$route.middleware || []), asyncWrap(m.bind(inst))]);
        });    
    }
    else if(typeof inst === 'function' && inst.$route) {
        router[inst.$route.verb](inst.$route.path, [...(inst.$route.middleware || []), asyncWrap(inst)]);        
    }
}

export function Route(verb, path, ...middleware) {
    return function decorator(target, key) {
        //console.log(typeof(target));
        let namepath = target.name || target.constructor.name;
        namepath = (namepath || '') + (key && namepath ? '/' + key : (key || ''));
        if(!verb) verb = 'get';
        if(!path) path = `/${namepath}`; 
        (key ? target[key] : target).$route = {verb, path, middleware};
    };
}