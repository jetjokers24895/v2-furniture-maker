'use strict';

var assert = require('assert');
// 
/**
 * params: is id of model
 * value : is dict 
 * params { _id: '5b5d35cbaa78bd3055e478ef' }
 * values { name: 'tom' }
 */
module.exports = {
  add_link_image : async (id,data,model_name) => {
    var params = {_id : id};
    // assert.equal(typeof params == 'object');
    // assert.equal(typeof data == 'object');
    console.log('params',params);
    console.log('data',data);
    console.log('model_name',model_name);
    await  strapi.services[model_name].edit(params,data);
  }
};