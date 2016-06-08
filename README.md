Decorouter
===================

Simple decorater based es6 class method routing for express nodejs

[![NPM version](https://badge.fury.io/js/decorouter.png)](http://badge.fury.io/js/decorouter)
[![Build Status](https://travis-ci.org/opentable/decorouter.png?branch=master)](https://travis-ci.org/decorouter/spur-ioc)

## Installation

```bash
$ npm install decorouter --save
```

## Usage

usage requiring [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)  with babel 6

```javascript
import { Route } from '../decorouter';

export class Controller
{
    constructor(){
        //usage not requiring babel-plugin-transform-decorators-legacy
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
    
    //will defaut to 'get' and '/defaultRouteAssignedByMethodName'
    @Route()
    defaultRouteAssignedByMethodName(req, res){
       res.send({from: 'defaultRouteAssignedByMethodName'}); 
    }
       
}
```

Registering routes
```javascript
import {addRoutes, addRoutesFromDir } from 'decorouter';
import express from 'express';
import { Controller } from './testControllers';

let router = express.Router();
addRoutes(router, () => new Controller());

//or all in this directory
addRoutesFromDir(router, module, (typeObject) => new typeObject());
```


