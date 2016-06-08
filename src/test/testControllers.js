import { Route } from '../decorouter';


export function plainHandler(req, res){
    res.send({from: 'plainHandler'});
}
Route('get','/plainHandler')(plainHandler);


export class Controller
{
    constructor(){
        Route('get','/methodWithoutDecorator')(this, 'methodWithoutDecorator');
    }

    //additional handlers can be added after route eg (req, res, next) => next()
    @Route('get', '/method')
    method(req, res) {
        res.send({from: 'method'});
    }
    
    //async methods can (and probably should) be used where neccessary
    @Route('get', '/methodAsync')
    async methodAsync(req, res){
        res.send({from: 'methodAsync'});
    }
    
    //additional handlers can be added after route eg (req, res, next) => next()
    @Route('get', '/methodWithAdditionalHandler', (req, res, next) => { res.handlerCalled = true; next();})
    methodWithAdditionalHandler(req, res) {
        res.send({
            from: 'methodWithAdditionalHandler', 
            handlerCalled: res.handlerCalled});
    }
    
    methodWithoutDecorator(req, res) {
        res.send({from: 'methodWithoutDecorator'});
    }
    
    @Route()
    defaultRouteAssignedByMethodName(req, res){
        res.send({from: 'defaultRouteAssignedByMethodName'}); 
    }
    
    @Route('get', '/methodThrows')
    methodThrows(req, res) {       
        res.send({from: 'methodThrows'});
        throw new Error('this is an error');
    }
    
    @Route('get', '/methodThrowsAsync')
    async methodThrowsAsync(req, res) {       
        res.send({from: 'methodThrowsAsync'});
        throw new Error('this is an error');
    }
    
       
}

